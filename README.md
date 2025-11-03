# 🚀 FullStack App

Uma aplicação full-stack moderna que combina a robustez do .NET com a flexibilidade do Angular.

## 📚 Índice
- [Visão Geral](#-visão-geral)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Começando](#-começando)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [CI/CD](#-cicd)
- [Roadmap](#-roadmap)

## 👀 Visão Geral

Este projeto é uma aplicação full-stack que demonstra boas práticas de desenvolvimento moderno, combinando:

### Backend (.NET)
- API RESTful com ASP.NET Core
- Banco de dados SQLite com Entity Framework Core
- Migrations automatizadas
- Scalar/OpenAPI para documentação

### Frontend (Angular)
- Interface moderna com Angular 20
- Estilização com Tailwind CSS
- Formatação automática com Biome
- Hooks de pré-commit para qualidade de código

## 🏗 Arquitetura

### Backend (Minimal API Architecture)

O backend segue uma arquitetura minimalista e eficiente, focada em simplicidade e performance:

1. **Camada Web (API)**
   - Controllers RESTful com atributos
   - Validação via ModelState
   - OpenAPI (Scalar) para documentação
   - CORS configurado para desenvolvimento
   - Padrão REST com verbos HTTP apropriados

2. **Camada de Persistência**
   - Entity Framework Core com SQLite
   - Migrations para controle de esquema
   - Uso de `AsNoTracking()` para queries de leitura
   - Tratamento de concorrência otimista
   - DbContext como Unit of Work

3. **Camada de Domínio**
   - Modelos POCO simples e diretos
   - Propriedades nullables apropriadas
   - Validações via ModelState
   - Respostas HTTP semânticas (200, 404, 400)

4. **Características Técnicas**
   - Injeção de Dependência nativa
   - Configuração via `appsettings.json`
   - Ambiente de dev/prod separados
   - Tratamento de erros HTTP adequado
   - Performance otimizada para leituras

### Frontend (Component-Based Architecture)

O frontend utiliza a arquitetura de componentes do Angular com:

1. **Componentes**
   - Componentes inteligentes (containers)
   - Componentes de apresentação (UI pura)
   - Reutilização via composição

2. **Serviços**
   - Comunicação HTTP com backend
   - Gerenciamento de estado
   - Lógica de negócio compartilhada

3. **Roteamento**
   - Lazy loading de módulos
   - Guards para proteção de rotas
   - Resolvers para pré-carregamento

### Comunicação

- API RESTful seguindo padrões HTTP
- Scalar/OpenAPI para documentação
- DTOs para contratos bem definidos
- Tratamento consistente de erros

## 🛠 Tecnologias

### Backend
- ⚡ .NET 10
- 🗄️ Entity Framework Core
- 📝 SQLite
- 📚 Scalar/OpenAPI

### Frontend
- 🅰️ Angular 20
- 🎨 Tailwind CSS
- 🔍 Biome (formatação)
- 🧹 Husky + lint-staged

## 🚦 Começando

### Pré-requisitos
- .NET SDK 8.x ou superior
- Node.js 20.x
- npm (vem com Node.js)

### Instalação e Execução

1. **Backend (API)**
   ```powershell
   cd Api
   dotnet build
   dotnet run
   ```
   A API estará disponível em `http://localhost:5287`

2. **Frontend**
   ```powershell
   cd client
   npm install
   npm start
   ```
   O app estará disponível em `http://localhost:4200`

## 📁 Estrutura do Projeto

```
fullStack/
├── Api/                # Backend .NET
│   ├── Controllers/    # Controllers da API
│   ├── Models/        # Modelos de dados
│   ├── Data/         # Contexto do EF Core
│   └── Migrations/   # Migrações do banco
│
└── client/           # Frontend Angular
    ├── src/
    │   ├── app/     # Componentes Angular
    │   └── styles/  # Estilos CSS
    └── public/      # Assets estáticos
```

## 💻 Desenvolvimento

### Comandos Úteis - Backend
```powershell
# Criar nova migração
dotnet ef migrations add NomeDaMigracao --project Api

# Atualizar banco
dotnet ef database update --project Api

# Verificar formatação
dotnet format --verify-no-changes
```

### Comandos Úteis - Frontend
```powershell
# Gerar novo componente
ng generate component novo-componente

# Formatar código
npm run format

# Verificar estilo
npm run lint
```

## 🧪 Testes

### Backend
```powershell
dotnet test Api
```

### Frontend
```powershell
cd client
npm test
```

## 🔄 CI/CD

O projeto usa GitHub Actions para:
- ✅ Compilar backend e frontend
- 🔍 Verificar formatação do código
- 📦 Preparar para deploy

Workflow disponível em `.github/workflows/ci.yml`

## 📝 Boas Práticas

- Mantenha secrets fora do repositório (use variáveis de ambiente)
- Crie migrações para alterações no banco
- Use branches para novas features
- Formate o código antes de commitar (automático via pre-commit hook)
- Escreva testes para novas funcionalidades

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## � Roadmap

Aqui estão as melhorias e evoluções planejadas para o futuro do projeto:

### Fase 1: Melhorias de Infraestrutura
- [ ] Migrar para PostgreSQL para maior escalabilidade
- [ ] Adicionar Docker Compose para ambiente de desenvolvimento
- [ ] Implementar cache distribuído com Redis
- [ ] Configurar Azure App Service para deploy

### Fase 2: Qualidade e Monitoramento
- [ ] Aumentar cobertura de testes (meta: 80%)
- [ ] Adicionar testes E2E com Cypress
- [ ] Implementar logging estruturado com Serilog
- [ ] Configurar monitoramento com Application Insights

### Fase 3: Features Técnicas
- [ ] Implementar autenticação JWT
- [ ] Adicionar rate limiting na API
- [ ] Configurar CORS adequadamente
- [ ] Implementar versionamento de API

### Fase 4: Melhorias de UX
- [ ] Adicionar tema escuro
- [ ] Implementar PWA
- [ ] Melhorar acessibilidade (WCAG 2.1)
- [ ] Adicionar internacionalização (i18n)

### Fase 5: Escalabilidade
- [ ] Implementar CQRS para operações complexas
- [ ] Adicionar filas com RabbitMQ para operações assíncronas
- [ ] Configurar CDN para assets estáticos
- [ ] Implementar cache em múltiplas camadas