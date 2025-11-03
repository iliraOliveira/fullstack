# 🚀 FullStack App

Uma aplicação full-stack moderna que combina a robustez do .NET com a flexibilidade do Angular.

## 📚 Índice
- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Começando](#-começando)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [CI/CD](#-cicd)

## 👀 Visão Geral

Este projeto é uma aplicação full-stack que demonstra boas práticas de desenvolvimento moderno, combinando:

### Backend (.NET)
- API RESTful com ASP.NET Core
- Banco de dados SQLite com Entity Framework Core
- Migrations automatizadas
- Swagger/OpenAPI para documentação

### Frontend (Angular)
- Interface moderna com Angular 20
- Estilização com Tailwind CSS
- Formatação automática com Biome
- Hooks de pré-commit para qualidade de código

## 🛠 Tecnologias

### Backend
- ⚡ .NET 10
- 🗄️ Entity Framework Core
- 📝 SQLite
- 📚 Swagger/OpenAPI

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

## 📄 Licença

Este projeto está sob a licença MIT.