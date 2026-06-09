# 🌱 GSMB-Space-Connect

## 👥Grupo
- **Gabriel Borba** - RM553187
- **Gabriel Souza Fiore** - RM553710
- **Gustavo Gouvêa Soares** - RM553842 
- **Pedro Henrique Mello Silva Alves** - RM554223
- **Guilherme Santiago** - RM552321

---

## 📺 Demonstração do Projeto

Confira os materiais de apresentação e demonstração do sistema nos links abaixo:

*   **📽️ Vídeo de Apresentação (Pitch/Demo):** [Assista no YouTube](https://youtu.be/GJkEjcoR1Dg)
*   **📂 Repositório de Documentos e Evidências:** [Acesse o Google Drive](https://drive.google.com/drive/folders/1feU5mgoKNvOpabytsF93Pbz9LPpVjde0?usp=sharing)

---

## 🚀 Visão Geral

O **GSMB-Space-Connect** é uma solução completa voltada para o agronegócio inteligente. O ecossistema utiliza um aplicativo móvel desenvolvido em **React Native (Expo)** integrado a um ecossistema robusto de backends (**C# .NET 8** e **Java Spring Boot**) para oferecer monitoramento de terrenos, gestão de culturas e alertas automatizados baseados em métricas geoespaciais.

### Principais Funcionalidades
*   🔐 Autenticação segura com JWT.
*   🚜 Cadastro detalhado de terrenos e fazendas (FarmInfo).
*   📊 Monitoramento de índices vegetativos (NDVI) e umidade.
*   🔔 Motor de Alertas inteligente (AlertEngine em C#) com mensagens para conversão em áudio.
*   📱 Interface mobile intuitiva e moderna.

---

## 📁 Estrutura do Repositório

*   `backend/` - APIs de orquestração e lógica de negócio.
    *   `services/AgroSat.AlertEngine.Api/` - Motor de alertas e CRUD de terrenos (.NET 8).
*   `mobile/` - Aplicativo móvel Expo.
    *   `src/app/` - Estrutura de rotas (Expo Router).
    *   `src/components/` - Componentes visuais reutilizáveis.

---

## 🛠️ Requisitos

*   **Backends:** .NET 8 SDK e Java 21.
*   **Mobile:** Node.js 20+ e Expo CLI.
*   **Banco de Dados:** MySQL Server.

---

## ⚙️ Guia de Instalação e Execução

### 1. Configurar e rodar o Backend (.NET)
1. Acesse o diretório: `cd backend/services/AgroSat.AlertEngine.Api`
2. Configure sua Connection String no `appsettings.json`.
3. Execute o projeto:
   ```bash
   dotnet run --urls "http://0.0.0.0:5050"
   ```

### 2. Configurar e rodar o App Mobile
1. Acesse o diretório: `cd mobile`
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o Host da API:
   No arquivo `mobile/app.json`, altere o IP em `expo.extra.API_HOST` para o IP da sua máquina local:
   ```json
   "extra": {
     "API_HOST": "192.168.x.x"
   }
   ```
4. Inicie o Expo:
   ```bash
   npx expo start
   ```
   *Dica: Use `npx expo start --tunnel` se estiver testando em redes diferentes.*

---

## 🔄 Fluxo de Utilização

1.  **Acesso:** O usuário realiza o Login ou Cadastro.
2.  **Configuração:** Na primeira entrada, o usuário é direcionado para o cadastro da fazenda (`farmInfo`).
3.  **Monitoramento:** Após o cadastro, a `Home` exibe os dados consolidados e o status do terreno.
4.  **Perfil:** A aba `Perfil` exibe detalhadamente as informações do produtor e da propriedade cadastrada.

---

## 🧹 Comandos Úteis

*   **Limpar Cache do Expo:** `npx expo start -c`
*   **Rodar Migrations (C#):** `dotnet ef database update`

---

## 📝 Observações Finais
*   O backend orquestrador e o motor de alertas devem estar ativos para o funcionamento pleno das métricas no aplicativo.
*   Certifique-se de que o dispositivo móvel e o computador estão na mesma rede Wi-Fi para comunicação via IP local.
