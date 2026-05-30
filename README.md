# GSMB-Space-Connect

## Como executar

```bash
# 1. Instalar dependências
cd mobile
npm install

# 2. Iniciar o servidor de desenvolvimento
npx expo start

# Caso o celular não conecte ao servidor via rede local (erro de 127.0.0.1 ou timeout), 
# utilize o modo tunnel para criar uma conexão externa:
npx expo start --tunnel

# 3. Limpar cache (se necessário)
npx expo start -c
```
