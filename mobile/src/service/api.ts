import Constants from "expo-constants";
import { Platform } from "react-native";

export type Terreno = {
  id: number;
  nome: string;
  descricao?: string | null;
  culturaAtual?: string | null;
  areaTotalHectares: number;
  areaReservaHectares: number;
  areaCultivoHectares: number;
  emCultivo: boolean;
};

export type CreateTerrenoRequest = {
  nome: string;
  descricao?: string | null;
  latitude: number;
  longitude: number;
  areaTotalHectares: number;
  areaReservaHectares: number;
  areaCultivoHectares: number;
  emCultivo: boolean;
  culturaAtual?: string | null;
  tipoSolo?: string | null;
  irrigacaoAtiva?: boolean;
  dataReferencia?: string;
  observacoes?: string | null;
};

const isTunnelHost = (host: string) => {
  return /exp\.host|expo\.dev|ngrok\.io/.test(host);
};

const parseHostFromManifest = (manifest: any) => {
  if (typeof manifest !== "object" || manifest === null) {
    return null;
  }

  const hostUri = manifest.debuggerHost ?? manifest.hostUri;
  if (typeof hostUri !== "string") {
    return null;
  }

  try {
    if (hostUri.includes("//")) {
      const url = new URL(hostUri);
      return url.hostname;
    }
  } catch {
    // ignore invalid URL and parse manually below
  }

  return hostUri.split(":")[0];
};

const getHostOverride = () => {
  const manualHost: string | null = null;
  if (manualHost) {
    return manualHost;
  }

  const expoHost = (Constants.expoConfig as any)?.extra?.API_HOST;
  if (typeof expoHost === "string" && expoHost.length > 0) {
    return expoHost;
  }

  return null;
};

const getDefaultBaseUrl = () => {
  if (Platform.OS === "android") {
    return "http://10.0.2.2:5050/api/v1";
  }
  return "http://localhost:5050/api/v1";
};

const getBaseUrlFromConfig = () => {
  const overrideHost = getHostOverride();
  if (overrideHost) {
    return `http://${overrideHost}:5050/api/v1`;
  }

  const manifest = Constants.manifest ?? (Constants as any).expoConfig;
  const host = parseHostFromManifest(manifest);

  if (typeof host === "string" && host.length > 0 && !isTunnelHost(host)) {
    if (
      Platform.OS === "android" &&
      (host === "localhost" || host === "127.0.0.1")
    ) {
      return getDefaultBaseUrl();
    }
    return `http://${host}:5050/api/v1`;
  }

  return getDefaultBaseUrl();
};

const BASE_URL = getBaseUrlFromConfig();

export async function createTerreno(payload: CreateTerrenoRequest): Promise<Terreno> {
  const BASE = getBaseUrlFromConfig();
  const response = await fetch(`${BASE}/terrenos`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ao criar terreno (status ${response.status}): ${errorText}`);
  }

  return response.json();
}

export async function getTerrenos(): Promise<Terreno[]> {
  const BASE = getBaseUrlFromConfig();
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 20000); // 20s para redes lentas

  try {
    const response = await fetch(`${BASE}/terrenos`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(id);

    if (response.status === 500) {
      let serverMessage = "Erro interno no servidor (500).";
      try {
        const errorBody = await response.json();
        if (errorBody && errorBody.message) {
          serverMessage += ` Detalhe: ${errorBody.message}`;
        }
      } catch (e) { /* ignore parse error */ }
      throw new Error(`${serverMessage}\nVerifique o console do VS no PC.`);
    }

    if (response.status === 404) {
      throw new Error(`Endpoint não encontrado no servidor (404). Verifique a URL.`);
    }

    if (!response.ok) {
      throw new Error(`Erro ao buscar terrenos (status ${response.status})`);
    }

    return response.json();
  } catch (error: any) {
    clearTimeout(id);
    if (error.name === "AbortError") {
      throw new Error("O servidor demorou demais para responder (Timeout). Verifique se o Backend está rodando e o Firewall liberado.");
    }
    if (error.message === "Network request failed") {
      throw new Error(
        `Não foi possível conectar ao servidor. Verifique se o backend está rodando em http://<IP-PC>:5050, se o celular está no mesmo Wi-Fi e se o IP do PC está configurado corretamente.`
      );
    }
    throw error;
  }
}
