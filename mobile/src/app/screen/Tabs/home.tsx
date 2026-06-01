import { ScrollView, View, Text } from "react-native";

import StatusCampo from "../../../components/statusCampo";
import IndicadoresCampo from "../../../components/indicadoresCampo";

export default function Home() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 mb-4 items-center">
        <Text className="font-inter text-2xl font-bold text-black">
          Olá, Produtor!
        </Text>

        <Text className="font-inter text-base text-gray-600 mt-1">
          Aqui estão as informações do seu campo hoje.
        </Text>
      </View>

      <View className="items-center">
        <StatusCampo status="saudavel" />
      </View>

      <View className="mt-6">
        <IndicadoresCampo
          umidade={45}
          riscoPragas="Baixo"
          previsao="Ensolarado"
          temperatura={28}
          saudeVegetacao="Alta"
        />
      </View>
    </ScrollView>
  );
}