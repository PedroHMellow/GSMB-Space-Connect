import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { getTerrenos, Terreno } from "../../../service/api";

function Bar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const ratio = total > 0 ? Math.min(1, value / total) : 0;
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${ratio * 100}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.barValue}>{value.toFixed(1)} ha</Text>
    </View>
  );
}

export default function Monitoramento() {
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTerrenos() {
      try {
        const data = await getTerrenos();
        setTerrrenosIfValid(data);
      } catch (err) {
        console.error(err);
        const message = err instanceof Error ? err.message : String(err);
        setError(`Falha ao carregar dados da API. Detalhe: ${message}`);
      } finally {
        setLoading(false);
      }
    }

    loadTerrenos();
  }, []);

  const setTerrrenosIfValid = (data: Terreno[]) => {
    if (!Array.isArray(data)) {
      setError("Resposta da API inesperada para terrenos.");
      return;
    }
    setTerrenos(data);
  };

  const totalHectares = terrenos.reduce((sum, terreno) => sum + terreno.areaTotalHectares, 0);
  const totalCultivo = terrenos.reduce((sum, terreno) => sum + terreno.areaCultivoHectares, 0);
  const totalReserva = terrenos.reduce((sum, terreno) => sum + terreno.areaReservaHectares, 0);

  const firstTerreno = terrenos[0];
  const statusTexto = terrenos.length === 0 ? "Sem dados" : totalCultivo / Math.max(1, totalHectares) > 0.8 ? "Risco" : totalCultivo / Math.max(1, totalHectares) > 0.5 ? "Atenção" : "Saudável";

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
      <Text style={styles.sectionTitle}>Monitoramento da API</Text>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#2e7d32" />
        </View>
      ) : error ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          <View style={styles.summaryCard}>
            <Text style={styles.cardTitle}>Resumo da API</Text>
            <Text style={styles.summaryText}>Terrenos carregados: {terrenos.length}</Text>
            <Text style={styles.summaryText}>Hectares totais: {totalHectares.toFixed(1)} ha</Text>
            <Text style={styles.summaryText}>Área em cultivo: {totalCultivo.toFixed(1)} ha</Text>
            <Text style={styles.summaryText}>Área de reserva: {totalReserva.toFixed(1)} ha</Text>
            <Text style={styles.summaryText}>Status estimado: {statusTexto}</Text>
          </View>

          <View style={styles.chartCard}>
            <Text style={styles.cardTitle}>Uso de área do primeiro terreno</Text>
            {firstTerreno ? (
              <>
                <Text style={styles.chartSubtitle}>{firstTerreno.nome}</Text>
                <Bar label="Cultivo" value={firstTerreno.areaCultivoHectares} total={firstTerreno.areaTotalHectares} color="#2e7d32" />
                <Bar label="Reserva" value={firstTerreno.areaReservaHectares} total={firstTerreno.areaTotalHectares} color="#F9A825" />
                <Bar label="Livre" value={Math.max(0, firstTerreno.areaTotalHectares - firstTerreno.areaCultivoHectares - firstTerreno.areaReservaHectares)} total={firstTerreno.areaTotalHectares} color="#90CAF9" />
              </>
            ) : (
              <Text style={styles.summaryText}>Nenhum terreno disponível para gráfico.</Text>
            )}
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.cardTitle}>Dados de Terrenos</Text>
            {terrenos.map((terreno) => (
              <View key={terreno.id} style={styles.terrenoRow}>
                <Text style={styles.terrenoName}>{terreno.nome}</Text>
                <Text style={styles.terrenoValue}>Área: {terreno.areaTotalHectares.toFixed(1)} ha</Text>
                <Text style={styles.terrenoValue}>Cultura: {terreno.culturaAtual ?? "---"}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    minHeight: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#14532d",
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  detailsCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111",
  },
  summaryText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 8,
  },
  chartSubtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#2E7D32",
  },
  barRow: {
    marginBottom: 12,
  },
  barLabel: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  barTrack: {
    width: "100%",
    height: 16,
    backgroundColor: "#F1F5F9",
    borderRadius: 99,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 99,
  },
  barValue: {
    marginTop: 4,
    fontSize: 13,
    color: "#555",
  },
  terrenoRow: {
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    paddingTop: 12,
    marginTop: 12,
  },
  terrenoName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  terrenoValue: {
    fontSize: 14,
    color: "#4B5563",
  },
  errorBox: {
    backgroundColor: "#FFF3F2",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderColor: "#F87171",
    borderWidth: 1,
  },
  errorText: {
    color: "#B91C1C",
    fontSize: 15,
  },
});
