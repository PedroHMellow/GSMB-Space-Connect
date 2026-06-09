import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from '@expo/vector-icons';
import { createTerreno } from "../../../service/api";

// Componente FarmInfo
export default function FarmInfo() {
  const router = useRouter();
  const [farmName, setFarmName] = useState("");
  const [cpf, setCpf] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [areaTotal, setAreaTotal] = useState("");

  const handleSave = async () => {
    if (!farmName.trim() || !cpf.trim() || !latitude.trim() || !longitude.trim() || !areaTotal.trim()) {
      Alert.alert("Erro", "Preencha todos os campos para continuar.");
      return; // Saída antecipada
    }

    const cpfOnlyNumbers = cpf.replace(/\D/g, "");
    if (cpfOnlyNumbers.length !== 11) {
      Alert.alert("Erro", "CPF deve conter 11 dígitos.");
      return; // Saída antecipada
    }

    const latValue = Number(latitude.replace(",", "."));
    const longValue = Number(longitude.replace(",", "."));
    const areaValue = Number(areaTotal.replace(",", "."));

    if (Number.isNaN(latValue) || Number.isNaN(longValue) || Number.isNaN(areaValue)) {
      Alert.alert("Erro", "Latitude, Longitude e Área Total devem ser valores numéricos válidos.");
      return; // Saída antecipada
    }

    const farmData = {
      farmName: farmName.trim().slice(0, 120),
      cpf: cpfOnlyNumbers,
      coordinates: {
        latitude: latValue,
        longitude: longValue,
      },
      areaTotalHectares: areaValue,
    };

    // Payload para a API do backend
    const apiPayload = {
      nome: farmData.farmName,
      descricao: "Terreno cadastrado pelo app Mobile",
      latitude: latValue,
      longitude: longValue,
      areaTotalHectares: areaValue,
      areaReservaHectares: 0,
      areaCultivoHectares: 0,
      emCultivo: true,
      culturaAtual: "Não informada",
      tipoSolo: "Não informado",
      irrigacaoAtiva: false,
      dataReferencia: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD para LocalDate
      observacoes: "Dados iniciais de cadastro de fazenda.",
    };

    try {
      await AsyncStorage.setItem("@farmInfo", JSON.stringify(farmData));
      try {
        await createTerreno(apiPayload);
      } catch (backendError) {
        console.warn("Falha ao enviar terreno ao backend:", backendError);
        Alert.alert(
          "Atenção",
          "Os dados foram salvos localmente, mas não foi possível enviar ao backend. Verifique a conexão e reinicie o aplicativo."
        );
      }
      router.replace("/screen/Tabs/home");
    } catch (error) {
      console.error("Erro ao salvar os dados localmente:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados da fazenda. Tente novamente.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Ajuste para Android se necessário
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
          {/* Header */}
          <View className="flex-row items-center p-4 bg-white border-b border-gray-100 shadow-sm">
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Feather name="arrow-left" size={24} color="#333" />
            </TouchableOpacity>
            <Text className="flex-1 text-center text-xl font-bold text-gray-800 -ml-10">
              Cadastro da Fazenda
            </Text>
          </View>

          <View className="p-6 space-y-6">
            <Text className="text-lg text-gray-600 text-center mb-4">
              Preencha os dados da sua propriedade para começar.
            </Text>

            {/* Nome da Fazenda */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">Nome da Fazenda</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 h-14 bg-white shadow-sm">
                <Feather name="home" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="Ex: Fazenda Verde"
                  placeholderTextColor="#9ca3af"
                  value={farmName}
                  onChangeText={(value) => setFarmName(value.slice(0, 120))}
                  maxLength={120}
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* CPF */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">CPF do Produtor</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 h-14 bg-white shadow-sm">
                <Feather name="user" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="000.000.000-00"
                  placeholderTextColor="#9ca3af"
                  value={cpf}
                  onChangeText={(value) => setCpf(value)}
                  keyboardType="numeric"
                  maxLength={14}
                />
              </View>
            </View>

            {/* Latitude da Sede */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">Latitude da Sede</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 h-14 bg-white shadow-sm">
                <Feather name="map-pin" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="Ex: -23.55052"
                  placeholderTextColor="#9ca3af"
                  value={latitude}
                  onChangeText={setLatitude}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Longitude da Sede */}
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-2">Longitude da Sede</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 h-14 bg-white shadow-sm">
                <Feather name="map-pin" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="Ex: -46.63331"
                  placeholderTextColor="#9ca3af"
                  value={longitude}
                  onChangeText={setLongitude}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Área de Cultivo Total (hectares) */}
            <View className="mb-4">
              <Text className="text-sm font-semibold text-gray-700 mb-2">Área Total da Propriedade (hectares)</Text>
              <View className="flex-row items-center border border-gray-300 rounded-xl px-4 h-14 bg-white shadow-sm">
                <Feather name="layers" size={20} color="#9ca3af" style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 text-base text-gray-800"
                  placeholder="Ex: 150.75"
                  placeholderTextColor="#9ca3af"
                  value={areaTotal}
                  onChangeText={setAreaTotal}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            {/* Botão Salvar */}
            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.8}
              className="bg-green-600 rounded-xl py-4 items-center shadow-md mt-6"
            >
              <Text className="text-base font-bold text-white">Salvar e Continuar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
