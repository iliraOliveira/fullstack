# Client

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

---

## Formatação e Biome

Este projeto usa o Biome como ferramenta de formatação e checagem (instalada localmente como devDependency).

- Para instalar dependências (incluindo o Biome):

```powershell
cd 'c:\TEMP\Projetos .NET\fullStack\client'
npm ci
```

- Scripts úteis no `package.json`:

	- `npm run format` — executa `biome format` (formata os arquivos)
	- `npm run lint` — executa `biome check` (checa por problemas/estilo)

- Uso recomendado:

	- Local: prefira `npm run format` ou `npm run lint` em vez de depender de uma instalação global do Biome.
	- CI: o workflow já executa `npm run lint` antes de construir o front-end. Se quiser que a CI corrija automaticamente, ajuste para `npm run format` (não recomendado em PRs sem review).
	- VS Code: se uma extensão reclamar que não encontra o "Biome binary", aponte a configuração da extensão para `./node_modules/.bin/biome` ou configure-a para usar o binário do workspace / `npx biome`.

Se precisar, eu posso adicionar um pequeno script de verificação pré-commit que rode `npm run lint` automaticamente antes do commit.
