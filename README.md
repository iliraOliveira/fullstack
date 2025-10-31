# fullStack

Aplicação full-stack (API .NET + cliente Angular) — repositório criado a partir do template local.

## Estrutura

- `Api/` — backend .NET (controllers + EF Core + SQLite).
- `client/` — frontend Angular (Angular 20, Tailwind).

## Como executar localmente

Pré-requisitos:
- .NET SDK 8.x instalado
- Node.js 20.x e npm

Rodando o backend (API):

```powershell
cd Api
dotnet build
dotnet run --project .\Api.csproj
```

O backend usa SQLite por padrão. O arquivo de banco (`student.db`) será criado no diretório onde a API for executada.

Rodando o frontend (cliente):

```powershell
cd client
npm install
npm start
```

O frontend está configurado para chamar a API em `http://localhost:5287` por padrão (veja `client/src/app/services/students.ts`). Ajuste a URL se necessário.

## Testes

- Backend (dotnet): `dotnet test` (se existirem testes adicionados)
- Frontend (Angular/Karma): `npm test` dentro de `client/`

## CI (GitHub Actions)

Este repositório contém um workflow básico de CI em `.github/workflows/ci.yml` que:
- compila a API com .NET
- instala dependências do client e compila o Angular

## Observações

- Mantenha `Api/appsettings.json` com valores sensíveis fora do repositório (use `secrets` / variáveis de ambiente em produção).
- Se alterar o modelo `Student`, lembre-se de criar uma migração EF Core (`dotnet ef migrations add <Name> --project Api`) e aplicar (`dotnet ef database update`).
