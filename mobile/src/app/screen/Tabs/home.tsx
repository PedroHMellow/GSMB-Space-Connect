import { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import StatusCampo from "../../../components/statusCampo";
import IndicadoresCampo from "../../../components/indicadoresCampo";
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

export default function Home() {
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"saudavel" | "atencao" | "risco">("saudavel");
  const [umidade, setUmidade] = useState(45);
  const [riscoPragas, setRiscoPragas] = useState("Baixo");
  const [saudeVegetacao, setSaudeVegetacao] = useState("Alta");

  useEffect(() => {
    async function loadTerrenos() {
      try {
        const [storedFarm, apiTerrenos] = await Promise.all([
          AsyncStorage.getItem("@farmInfo"),
          getTerrenos(),
        ]);

        const localFarm = storedFarm ? (JSON.parse(storedFarm) as LocalFarmInfo) : null;
        const localTerreno: Terreno | null = localFarm
          ? {
              id: -1,
              nome: localFarm.farmName,
              descricao: "Terreno salvo localmente",
              culturaAtual: "Não informada",
              areaTotalHectares: localFarm.areaTotalHectares,
              areaReservaHectares: 0,
              areaCultivoHectares: 0,
              emCultivo: false,
            }
          : null;

        const finalTerrenos = localTerreno
          ? [localTerreno, ...apiTerrenos.filter((item) => item.nome !== localFarm?.farmName)]
          : apiTerrenos;

        setTerrenos(finalTerrenos);

        const referenceTerreno = finalTerrenos[0];
        const cultivationRatio = referenceTerreno
          ? referenceTerreno.areaTotalHectares > 0
            ? referenceTerreno.areaCultivoHectares / referenceTerreno.areaTotalHectares
            : 0
          : 0;

        if (cultivationRatio > 0.75) {
          setStatus("risco");
          setRiscoPragas("Alto");
          setSaudeVegetacao("Baixa");
          setUmidade(Math.min(100, Math.round(cultivationRatio * 100)));
        } else if (cultivationRatio > 0.45) {
          setStatus("atencao");
          setRiscoPragas("Médio");
          setSaudeVegetacao("Média");
          setUmidade(Math.min(100, Math.round(cultivationRatio * 100)));
        } else {
          setStatus("saudavel");
          setRiscoPragas("Baixo");
          setSaudeVegetacao("Alta");
          setUmidade(Math.min(100, Math.round(cultivationRatio * 100)));
        }
      } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : String(err);
        setError(
          `Não foi possível carregar os terrenos. Verifique se o backend está rodando.\nDetalhe: ${message}`
        );
      } finally {
        setLoading(false);
      }
    }

    loadTerrenos();
  }, []);

  function renderTerreno({ item }: { item: Terreno }) {
    return (
      <View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 20,
          padding: 16,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700", color: "#111" }}>
          {item.nome}
        </Text>
        <Text style={{ color: "#555", marginTop: 4 }}>
          {item.descricao ?? "Sem descrição"}
        </Text>
        <Text style={{ color: "#333", marginTop: 10 }}>
          Cultura: {item.culturaAtual ?? "Não informada"}
        </Text>
        <Text style={{ color: "#333" }}>
          Área total: {item.areaTotalHectares} ha
        </Text>
        <Text style={{ color: "#333" }}>
          Em cultivo: {item.emCultivo ? "Sim" : "Não"}
        </Text>
      </View>
    );
  }

  function renderHeader() {
    return (
      <>
        <View className="mb-4 items-center">
          <Text className="font-inter text-2xl font-bold text-black">
            Olá, Produtor!
          </Text>

          <Text className="font-inter text-base text-gray-600 mt-1 text-center">
            Aqui estão as informações do seu campo hoje.
          </Text>
        </View>

        <View className="items-center mb-6">
          <StatusCampo status={status} ultimaAtualizacao="2 min" />
        </View>

        <View className="mb-6">
          <IndicadoresCampo
            umidade={umidade}
            riscoPragas={riscoPragas}
            previsao="Estável"
            temperatura={28}
            saudeVegetacao={saudeVegetacao}
          />
        </View>

        <View className="mb-4">
          <Text className="text-xl font-bold text-black mb-2">Terrenos</Text>
        </View>
      </>
    );
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F3F4F6",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#F3F4F6",
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Text style={{ color: "#B71C1C", fontSize: 16, textAlign: "center" }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={terrenos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderTerreno}
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={() => (
        <Text className="text-gray-600 text-center">Nenhum terreno encontrado.</Text>
      )}
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 120,
        paddingHorizontal: 16,
      }}
      showsVerticalScrollIndicator={false}
    />
  );
}
