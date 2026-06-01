import { View, Text } from "react-native";
import { Droplets, Bug, Sun, Leaf } from "lucide-react-native";

type IndicadoresCampoProps = {
  umidade: number;
  riscoPragas: string;
  previsao: string;
  temperatura: number;
  saudeVegetacao: string;
};

export default function IndicadoresCampo({
  umidade,
  riscoPragas,
  previsao,
  temperatura,
  saudeVegetacao,
}: IndicadoresCampoProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
        paddingHorizontal: 16,
      }}
    >
      <CardIndicador
        titulo="Umidade do Solo"
        valor={`${umidade}%`}
        icon={<Droplets size={24} color="#90CAF9" />}
      />

      <CardIndicador
        titulo="Risco de Pragas"
        valor={riscoPragas}
        destaque
        icon={<Bug size={24} color="#2E7D32" />}
      />

      <CardIndicador
        titulo="Previsão"
        valor={previsao}
        subtitulo={`${temperatura}°C`}
        icon={<Sun size={24} color="#FBC02D" />}
      />

      <CardIndicador
        titulo="Saúde da Vegetação"
        valor={saudeVegetacao}
        destaque
        icon={<Leaf size={24} color="#2E7D32" />}
      />
    </View>
  );
}

type CardProps = {
  titulo: string;
  valor: string;
  subtitulo?: string;
  icon: React.ReactNode;
  destaque?: boolean;
};

function CardIndicador({
  titulo,
  valor,
  subtitulo,
  icon,
  destaque = false,
}: CardProps) {
  return (
    <View
      style={{
        width: "48%",
        minHeight: 120,
        backgroundColor: "#FFF",
        borderRadius: 20,
        padding: 12,
        borderLeftWidth: destaque ? 5 : 0,
        borderLeftColor: "#2E7D32",
        justifyContent: "space-between",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          backgroundColor: "#F5F5F5",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </View>

      <Text
        style={{
          fontSize: 16,
          color: "#616161",
          fontWeight: "600",
        }}
      >
        {titulo}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: destaque ? "#2E7D32" : "#212121",
          }}
        >
          {valor}
        </Text>

        {subtitulo && (
          <Text
            style={{
              fontSize: 14,
              color: "#757575",
              marginLeft: 4,
              marginBottom: 2,
            }}
          >
            {subtitulo}
          </Text>
        )}
      </View>
    </View>
  );
}