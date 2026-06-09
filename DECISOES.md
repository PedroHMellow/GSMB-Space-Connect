# 📑 Decisões Técnicas - GSMB-Space-Connect

Este documento detalha as escolhas arquiteturais e técnicas feitas durante o desenvolvimento do aplicativo mobile para a Global Solution 2026, justificando as ferramentas utilizadas e a organização do código.

## 1. Arquitetura de Navegação: Expo Router
Optamos pelo **Expo Router** em vez do React Navigation tradicional por diversos fatores estratégicos:

- **Navegação Baseada em Arquivos (File-based Routing):** Semelhante ao Next.js, a estrutura de pastas dentro de `src/app/` define as rotas. Isso reduz o "boilerplate" de configuração e torna a visualização do fluxo do app muito mais intuitiva para novos desenvolvedores.
- **Typed Routes (Segurança):** O Expo Router gera automaticamente tipos para as rotas. Isso impede que naveguemos para telas inexistentes, erro comum que o TypeScript strict ajuda a mitigar.
- **Deep Linking Nativo:** O suporte a links profundos é nativo, o que facilita o compartilhamento de talhões ou alertas específicos através de links externos no futuro.
- **Organização de Layouts:** O uso de arquivos `_layout.tsx` permite reaproveitar elementos visuais (como o Header ou abas) de forma declarativa e limpa.

## 2. Persistência Local: AsyncStorage
Para cumprir o requisito de persistência da identidade e preferências do usuário, utilizamos o `@react-native-async-storage/async-storage`:

- **Persistência do JWT:** O token de autenticação gerado pelo backend Java é armazenado para que o usuário não precise realizar login todas as vezes que abrir o app.
- **Camada de Abstração (`services/storage.ts`):** Criamos um wrapper em volta do AsyncStorage. Em vez de chamar o storage diretamente nos componentes, utilizamos métodos como `saveUserSession` e `getUserSession`. Isso isola a lógica de serialização/deserialização (JSON.stringify/parse) e facilita a manutenção.
- **Sobrevivência de Dados:** Preferências de filtros de NDVI e dados básicos da fazenda (FarmInfo) são persistidos para que o app funcione de forma ágil mesmo em condições de baixa conectividade no campo.

## 3. Consumo de Dados e Tipagem
- **Camada de Serviço (Axios):** Centralizamos todas as chamadas à API em `services/api.ts`. Isso nos permite configurar o `API_HOST` em um único lugar e injetar o token de autenticação nos headers de forma global via interceptors.
- **TypeScript Strict:** Não utilizamos `any`. Todas as respostas da API (.NET e Java) possuem interfaces correspondentes. Isso garante que, se um campo mudar no backend, o erro de compilação no mobile nos avise imediatamente.

## 4. Interface e Experiência do Usuário (UI/UX)
- **NativeWind (Tailwind CSS):** Escolhemos o NativeWind para estilização por permitir uma iteração visual rápida e consistente com o sistema de design agro (tons de verde e terra).
- **Estados de Feedback:** Todas as telas de listagem (FlatList) implementam estados de *Loading* e *Error* (amigável em PT-BR), garantindo que o usuário saiba o que está acontecendo durante o processamento dos dados satelitais.

## 5. Integração com Backend (Java e C#)
O app consome um ecossistema híbrido:
- **Java (Spring Boot):** Orquestra o cadastro de usuários e a persistência principal.
- **C# (.NET 8):** Processa as métricas complexas de NDVI e gera a `mensagemParaFala` (TTS), que o app exibe como alertas críticos para o produtor.

---
**Grupo:**
- Gabriel Borba (RM553187)
- Gabriel Souza Fiore (RM553710)
- Gustavo Gouvêa Soares (RM553842)
- Pedro Henrique Mello Silva Alves (RM554223)
- Guilherme Santiago (RM552321)