import { useEffect, useState } from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BotaoSairConta from "../../../components/botaoSairConta";
import ProfileInfoCard from "../../../components/ProfileInfoCard";
import { getTerrenos, Terreno } from "../../../service/api";

type LocalFarmInfo = {
  farmName: string;
  cpf: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  areaTotalHectares: number;
};

export default function Perfil() {
    const [user, setUser] = useState<any>(null);
    const [farm, setFarm] = useState<Terreno | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProfileData() {
            try {
                // 1. Tenta recuperar os dados do usuário (ajuste a chave conforme seu storage)
                const storedUser = await AsyncStorage.getItem("@user_logged");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                } else {
                    // Fallback para o primeiro usuário da lista se não houver sessão ativa salva
                    const usersJson = await AsyncStorage.getItem("@users");
                    if (usersJson) {
                        const users = JSON.parse(usersJson);
                        if (users.length > 0) setUser(users[0]);
                    }
                }

                // 2. Tenta recuperar os dados da fazenda local primeiro
                const storedFarm = await AsyncStorage.getItem("@farmInfo");
                if (storedFarm) {
                    const localFarm = JSON.parse(storedFarm) as LocalFarmInfo;
                    setFarm({
                        id: -1,
                        nome: localFarm.farmName,
                        descricao: "Terreno salvo localmente",
                        culturaAtual: "Não informada",
                        areaTotalHectares: localFarm.areaTotalHectares,
                        areaReservaHectares: 0,
                        areaCultivoHectares: 0,
                        emCultivo: false,
                    });
                } else {
                    const terrenos = await getTerrenos();
                    if (terrenos && terrenos.length > 0) {
                        setFarm(terrenos[0]); // Exibe o primeiro terreno vinculado
                    }
                }
            } catch (error) {
                console.error("Erro ao carregar perfil:", error);
            } finally {
                setLoading(false);
            }
        }

        loadProfileData();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-background">
                <ActivityIndicator size="large" color="#2e7d32" />
            </View>
        );
    }

    // Formatação dos dados para o componente de exibição
    const userData = {
        nome: user?.fullName || "Usuário AgroSat",
        cpf: user?.emailOrPhone || "produtor@agrosat.com"
    };

    const farmData = {
        nome: farm?.nome || "Fazenda não identificada",
        culturaAtual: farm?.culturaAtual || "Nenhum cultivo ativo",
        areaTotalHectares: farm?.areaTotalHectares || 0,
        areaCultivoHectares: farm?.areaCultivoHectares || 0,
        tipoSolo: farm?.tipoSolo || "Não informado",
        irrigacaoAtiva: farm?.irrigacaoAtiva || false,
        latitude: Number(farm?.latitude) || 0,
        longitude: Number(farm?.longitude) || 0,
    };

    return (
        <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 100 }}>
            <ProfileInfoCard userData={userData} farmData={farmData} />
            
            <View className="px-6 mt-4">
                <BotaoSairConta />
            </View>
        </ScrollView>
    );
}