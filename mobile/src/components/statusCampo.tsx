import { View, Text, Image } from "react-native";

type StatusCampoCardProps = {
  status: "saudavel" | "atencao" | "risco";
  ultimaAtualizacao?: string;
};

export default function StatusCampoCard({
  status,
  ultimaAtualizacao = "10 min.",
}: StatusCampoCardProps) {
  const config = {
    saudavel: {
      emoji: "🟢",
      texto: "Saudável",
      corTexto: "#2E7D32",
      corFundo: "#E8F5E9",
    },
    atencao: {
      emoji: "🟡",
      texto: "Atenção",
      corTexto: "#F9A825",
      corFundo: "#FFF8E1",
    },
    risco: {
      emoji: "🔴",
      texto: "Risco",
      corTexto: "#C62828",
      corFundo: "#FFEBEE",
    },
  };

  const atual = config[status];

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: "center",
        borderLeftWidth: 5,
        borderLeftColor: "#2E7D32",
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <Image
        source={require("../assets/images/logo-app.png")}
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          marginBottom: 20,
        }}
        resizeMode="contain"
      />

      <View
        style={{
          backgroundColor: atual.corFundo,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 18,
          paddingVertical: 10,
          borderRadius: 999,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18 }}>{atual.emoji}</Text>

        <Text
          style={{
            marginLeft: 8,
            color: atual.corTexto,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Status: {atual.texto}
        </Text>
      </View>

      <Text
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: 16,
          lineHeight: 24,
        }}
      >
        Monitoramento via satélite atualizado há{"\n"}
        {ultimaAtualizacao}
      </Text>
    </View>
  );
}