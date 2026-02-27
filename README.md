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
│ ├── tests
│ ├── package.json
│ └── jest.config.js
│
├── UI
│ ├── cypress
│ │ ├── e2e
│ │ ├── fixtures
│ │ ├── support
│ │ ├── reports
│ ├── cypress.config.js
│
├── Mobile
│ ├── config
│ ├── pages
│ ├── tests
│ ├── allure-results
│ ├── allure-report
│ └── package.json
│
├── performance
│ ├── login.test.js
│ ├── browse.test.js
│ └── users.js
│
├── .github
│ └── workflows
│ └── ci.yml
│
├── package.json
├── README.md
└── .gitignore
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

## Subir os containers existentes

```bash
docker start wp_db wp
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

# Testes de Performance (k6)

Entrar na pasta:

```bash
cd performance
```

Executar teste de login:

```bash
k6 run login.test.js
```

Executar teste de navegação/home:

```bash
k6 run home.test.js
```

Configuração aplicada:
- 20 usuários virtuais
- 2 minutos de execução
- Ramp-up de 20 segundos
- Threshold p95 configurado
- Taxa máxima de erro < 5%

---

# Testes de API – Supertest + Jest

Entrar na pasta:

```bash
cd API
```

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

# Testes Web – Cypress

Pasta: `/UI`

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

# Testes Mobile – WebdriverIO + Appium

Entrar na pasta:

```bash
cd Mobile
```

---

## Pré-requisitos

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

## Rodar testes Mobile

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

# Integração Contínua (CI)

A pipeline está configurada em:

```
.github/workflows/ci.yml
```

Ela executa automaticamente:
- Instalação de dependências
- Testes Cypress em modo headless
- Upload de artifacts

Disparada automaticamente a cada:
- Push na branch main
- Pull Request para main

---

# Ordem Recomendada de Execução Local

1. Subir Docker
2. Executar Performance
3. Executar API
4. Executar UI
5. Executar Mobile
6. Commit + Push (CI roda automaticamente)

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