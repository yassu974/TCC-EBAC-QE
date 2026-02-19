# TCC – EBAC | Engenheiro de Qualidade de Software  
## Automação Completa – Loja EBAC

Projeto final de automação de testes contemplando:

- Testes Web (E2E) – Cypress  
- Testes de API – Supertest + Jest  
- Testes Mobile – WebdriverIO + Appium  
- Docker (ambiente isolado)  
- Page Object Pattern  
- Custom Commands  
- Relatórios automatizados (Mochawesome + Allure)  
- Estrutura preparada para CI  

---

# Estrutura do Projeto

```
TCC-EBAC-QE
│
├── API
│   ├── tests
│   ├── package.json
│
├── UI
│   ├── cypress
│   │   ├── e2e
│   │   ├── fixtures
│   │   ├── support
│   │   ├── reports
│   │   └── cypress.config.js
│   └── package.json
│
├── Mobile
│   ├── config
│   ├── pages
│   ├── tests
│   └── package.json
│
└── performance
```

---

# Subir Ambiente da Loja (Docker)

## Criar rede Docker

```bash
docker network create --attachable ebac-network
```

## Subir Banco de Dados

```bash
docker run -d \
--name wp_db \
-p 3306:3306 \
--network ebac-network \
ernestosbarbosa/lojaebacdb:latest
```

## Subir Aplicação (WordPress + WooCommerce)

```bash
docker run -d \
--name wp \
-p 80:80 \
--network ebac-network \
ernestosbarbosa/lojaebac:latest
```

## Verificar containers ativos

```bash
docker ps
```

## Parar containers

```bash
docker stop wp wp_db
```

## Remover containers

```bash
docker rm wp wp_db
```

A aplicação ficará disponível em:

```
http://localhost
```

---

# Testes Web – Cypress

📁 Pasta: `/UI`

---

## Rodar Cypress em modo interativo

```bash
npm run cy:open
```

---

## Rodar testes via terminal

```bash
npm run cy:run
```

---

## Rodar testes no Chrome

```bash
npm run cy:run:chrome
```

---

## Gerar Relatório HTML (Mochawesome)

### Fluxo completo (limpa + executa + gera relatório)

```bash
npm run test:report
```

Esse comando:

- Limpa relatórios antigos
- Executa testes
- Gera relatório HTML consolidado
- Abre automaticamente o relatório

---

## Limpar relatórios manualmente

```bash
npm run report:clean
```

ou

```bash
npx rimraf UI/cypress/reports
```

---

# Testes de API – Supertest + Jest

📁 Pasta: `/API`

---

## Instalar dependências

```bash
npm install
```

## Rodar testes de API

```bash
npm test
```

ou

```bash
npm run test
```

---

# Testes Mobile – WebdriverIO + Appium

📁 Pasta: `/Mobile`

---

## 🔧 Pré-requisitos

- Android Emulator ativo
- Appium Server rodando na porta 4723

Verificar dispositivos conectados:

```bash
adb devices
```

---

## Instalar dependências

```bash
npm install
```

---

## ▶ Rodar testes Mobile

```bash
npm test
```

Executa:

```bash
wdio config/wdio.conf.js
```

---

## Gerar relatório Allure

Após execução:

```bash
npx allure serve allure-results
```

---

## Limpar relatórios Allure

```bash
npx rimraf Mobile/allure-results
npx rimraf Mobile/allure-report
```

---

# Fluxo Ideal de Execução Local

## UI

```bash
npm run test:report
```

## API

```bash
cd API
npm test
```

## Mobile

```bash
cd Mobile
npm test
```

---

# Observações Importantes

- Pastas de relatórios estão no `.gitignore`
- Testes de login criam usuário dinamicamente
- Testes de carrinho validam regra de limite não implementada
- Testes de API validam autenticação e regra de duplicidade
- Testes Mobile possuem workaround para instabilidade do app

---

# Autor

Projeto desenvolvido como entrega final do curso  
**Engenheiro de Qualidade de Software – EBAC**