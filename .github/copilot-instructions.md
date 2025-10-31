## Visão rápida

Este repositório é uma aplicação full-stack simples com duas peças principais:
- `Api/` — backend .NET (controllers + EF Core + SQLite).
- `client/` — front-end Angular (Angular 20, Tailwind presente).

Objetivo deste arquivo: orientar agentes de codificação a serem produtivos aqui — como executar, onde olhar, convenções específicas e exemplos concretos.

## Arquitetura (big picture)
- Backend: `Api/Program.cs` configura um WebApplication minimal com `AddControllers()`, `AddDbContext<AppDbContext>` (SQLite via `ConnectionStrings:DefaultConnection` em `Api/appsettings.json`) e `AddOpenApi()` (`MapOpenApi()` em dev).
- Dados: `Api/Data/AppDbContext.cs` expõe `DbSet<Student> Students`. Migrations estão em `Api/Migrations/`.
- Controllers: `Api/Controller/StudentController.cs` implementa CRUD usando EF Core. Leituras usam `AsNoTracking()`.
- Frontend: `client/` é um app Angular gerado pelo Angular CLI; entrada: `src/main.ts`, configuração em `client/angular.json` e scripts em `client/package.json`.

## Contrato de API e modelo de dados
- Endpoints principais (exemplos):
  - GET  `/api/student` — retorna lista de `Student` (usa `AsNoTracking`).
  - GET  `/api/student/{id}` — retorna um `Student` ou 404.
  - POST `/api/student` — cria um `Student` (valida `ModelState`).
  - PUT  `/api/student/{id}` — atualiza com `EntityState.Modified` e trata `DbUpdateConcurrencyException`.
- Modelo `Student` está em `Api/Models/Student.cs` com propriedades: `Id`, `Name`, `Address?`, `PhoneNumber?`, `Email?`.

## Como rodar (developer workflows)
- Backend (PowerShell):
  - Compilar: `dotnet build .\Api` ou `dotnet build fullStack.sln`
  - Executar: `dotnet run --project .\Api` (observe a URL/porta exibida no terminal)
  - O banco é SQLite por padrão: `Api/appsettings.json` contém `"DefaultConnection": "Data Source=student.db"` — o arquivo `student.db` será criado no diretório da execução.
  - Migrations: há migrações em `Api/Migrations/`. Para aplicar (se precisar): instale `dotnet-ef` e rode `dotnet ef database update --project Api --startup-project Api`.
- Frontend (PowerShell):
  - Instalar deps: `cd client; npm install`
  - Dev server: `npm start` (mapeado para `ng serve`).
  - Build produção: `npm run build`.
- Rodando ambos: abrir dois terminais (um para API, outro para client). O front chama a API via URL do backend (ver output do `dotnet run`).

## Padrões e convenções do projeto
- Controllers usam rota `api/[controller]` e retornam `ActionResult<T>`/`IActionResult`.
- Leituras usam `AsNoTracking()` e updates usam `Entry(...).State = EntityState.Modified`.
- Banco local: SQLite file `student.db` — fácil para dev, especialmente com migrations já incluídas.
- Frontend: assets públicos em `client/public`; estilos em `src/styles.css`. Tailwind está presente nas dependências.
- Cliente tem um arquivo de instruções específico: `client/.github/copilot-instructions.md` com práticas Angular/TypeScript — agentes devem consultá-lo para regras de UI/TS.

## Pontos de integração e dependências externas
- SQLite (local file) — `Api/appsettings.json`.
- EF Core migrations em `Api/Migrations`.
- OpenAPI: `AddOpenApi()`/`MapOpenApi()` — documentação disponível em ambiente de desenvolvimento.
- Frontend depende de Angular CLI e `@angular/build` (veja `client/package.json`).

## Exemplos rápidos (uso/pruebas)
- Após rodar a API (ex.: `https://localhost:5001`), listar alunos:
  - HTTP: `GET {API_BASE_URL}/api/student`
  - Criar: `POST {API_BASE_URL}/api/student` com JSON do `Student` (ver propriedades em `Api/Models/Student.cs`).

## Locais chave para inspeção rápida
- Backend: `Api/Program.cs`, `Api/Controller/StudentController.cs`, `Api/Data/AppDbContext.cs`, `Api/Models/Student.cs`, `Api/Migrations/`.
- Frontend: `client/package.json`, `client/angular.json`, `client/src/` (start em `src/main.ts`, componentes em `src/app/`).
- Configs e secrets: `Api/appsettings.json` (connection string SQLite).

## Observações ao mesclar/alterar código
- Preserve o padrão de `AsNoTracking()` para leitura quando possível (melhora performance e evita rastreamento desnecessário).
- Ao alterar o modelo `Student`, atualize `Api/Migrations/` e crie uma nova migração (`dotnet ef migrations add <name> --project Api`).
- No cliente, siga as regras locais em `client/.github/copilot-instructions.md` para padrões de TypeScript/Angular.

Se algo importante ficou omisso ou se preferir instruções em outro formato (ex.: checklist de PR, testes automatizados), diga o que ajustar e eu atualizo este arquivo.

## Exemplos de requests
Use estes exemplos para testar endpoints locais após iniciar a API.

- cURL (GET lista):

```bash
curl -sS https://localhost:5001/api/student -k
```

- cURL (POST criar):

```bash
curl -sS https://localhost:5001/api/student -k \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva","address":"Rua A, 123","phoneNumber":"(11) 99999-9999","email":"joao@example.com"}'
```

- PowerShell Invoke-RestMethod (GET):

```powershell
Invoke-RestMethod -Uri https://localhost:5001/api/student -Method Get -SkipCertificateCheck
```

- HTTPie (human-friendly):

```bash
http --verify=no GET https://localhost:5001/api/student
http --verify=no POST https://localhost:5001/api/student name="Maria" address="Rua B" phoneNumber="123" email="maria@example.com"
```

Notas:
- Em ambientes locais com certificado de desenvolvimento self-signed use `-k` (cURL) ou `--verify=no` (HTTPie) ou `-SkipCertificateCheck` (PowerShell).
- Substitua `https://localhost:5001` pela URL/porta mostrada pelo `dotnet run` no seu ambiente.

## Instruções de CI (GitHub Actions) — sugestão
Este repositório não tem workflow padrão. Abaixo há um exemplo mínimo de workflow GitHub Actions que:
- instala .NET SDK, compila a API, executa `dotnet build` e (opcional) `dotnet test`;
- instala Node.js, executa `npm ci` no `client/`, e roda `npm run build`.

Cole este arquivo como `.github/workflows/ci.yml` se quiser CI básico:

```yaml
name: CI

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build-backend:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup .NET
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '8.0.x'
      - name: Restore & Build API
        working-directory: Api
        run: |
          dotnet restore
          dotnet build --no-restore -c Release
      - name: (Opcional) Run API tests
        working-directory: Api
        run: |
          if (Test-Path -Path "./tests") { dotnet test -c Release }

  build-frontend:
    runs-on: ubuntu-latest
    needs: build-backend
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install & Build Client
        working-directory: client
        run: |
          npm ci
          npm run build --if-present

  # Observação: para projetos maiores, separe testes e lint em jobs próprios
```

Sugestões práticas para CI:
- Use `windows-latest` para jobs dotnet se precisar rodar comandos PowerShell específicos; `ubuntu-latest` é suficiente para a maior parte dos builds .NET e do cliente Angular.
- Se adicionar testes no backend ou frontend, adicione steps `dotnet test` e `npm test` respectivamente.
- Para publicar artefatos (builds), use `actions/upload-artifact` e `actions/download-artifact` entre jobs.

---

Se quiser, eu posso criar esse workflow (`.github/workflows/ci.yml`) diretamente no repositório e ajustar as versões do SDK/Node para as que você usa — quer que eu adicione o arquivo de CI agora?
