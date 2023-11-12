#### Ignite - Trilha Node.js
# 🚀 Projeto 03 - API Node.js com SOLID

## Sobre
- Nesse projeto será desenvolvido uma aplicação para check-ins em academias. Aqui você irá aprender sobre alguns conceitos do SOLID, Design Patterns, Docker para Iniciar o banco de dados, JWT e Refresh Token, RBAC e diversos outros conceitos

## Preparando a aplicação
- Para facilitar a preparação do ambiente para desenvolvimento, acesse o projeto https://github.com/fabiosvf/trilha-nodejs-projeto-02 e siga as orientações dos subtítulos:
  - [Iniciando o ambiente de desenvolvimento](https://github.com/fabiosvf/trilha-nodejs-projeto-02#iniciando-o-ambiente-de-desenvolvimento)
  - [Configurando o TypeScript](https://github.com/fabiosvf/trilha-nodejs-projeto-02#configurando-o-typescript)
  - [Configuranco o Fastify](https://github.com/fabiosvf/trilha-nodejs-projeto-02#configurando-o-fastify)
  - [Configurando o Eslint](https://github.com/fabiosvf/trilha-nodejs-projeto-02#configurando-o-eslint)
  - [Convertendo o código TypeScript em JavaScript](https://github.com/fabiosvf/trilha-nodejs-projeto-02#convertendo-o-c%C3%B3digo-typescript-em-javascript)
    - Foque apenas na instalação da lib `tsup` e a configuração no arquivo `package.json` relacionado

## Usando versões exatas do NPM
- Uma dica para manter a integridade da aplicação, mantendo uma versão fixa, e evitando que o sistema quebre em algum momento devido a alguma atualização, crie o arquivo `.npmrc` na raiz do projeto, e defina o seguinte parâmetro:
```
save-exact=true
```
- Esse parâmetro vai fazer com que o `npm` fixe a versão da lib ao executar o comando `npm install`
- Uma dica para atualização das libs de um projeto de forma controlada, é a utilização de bots como no caso do `renovate`
  - Segue o link do GitHub https://github.com/renovatebot/renovate
  - Essa ferramenta fica verificando, de forma automatizada, quando uma determinada lib foi atualizada, tenta fazer uma tentativa de atualização e em seguida roda os testes. Caso os testes passem todos com sucesso, ele gera automaticamente um `Pull Request` com a sugestão de atualização. Isso agiliza e muito o processo de atualização das libs.

## Carregando e Validando Variáveis de Ambiente
- Para acessar as variáveis de ambiente é necessário instalar a lib `dotenv` e configurar o arquivo `.env` na raiz do projeto
- Para validar a existência das variáveis de ambiente é necessário instalar a lib `zod` e depois realizar as configurações. No nosso caso, as configurações estão disponíveis no arquivo `/src/env/index.ts`.
- Depois basta utilizar esse módulo em todos os lugares que utilizam variáveis de ambiente, como a porta do server em `/src/server.ts` ou até na configuração do banco de dados, geralmente nomeado como `database.ts`

## Criando Aliases de Importação
- Afim de facilitar a importação das referencias de módulos e libs à partir de qualquer ponto dentro do projeto, tem um recurso muito interessante que podemos habilitar no arquivo `tsconfig.json`. Segue a configuração:
  _- Lembrando que ocultei as demais configurações do arquivo e mantive apenas o que é relevante para essa configuração, e também para facilitar o entendimento._
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    },
  }
}
```
- Com essa configuração, toda vez que precisarmos referenciar um arquivo, basta iniciar com __"@/"__ na área de `import` que o VSCode vai considerar sempre o caminho __Absoluto__ ao invés do caminho __Relativo__ onde geralmente utilizamos __"../../.."__ para navegar entre as estruturas de pastas.

## Como executar
- Crie uma pasta para o projeto
- Acesse a pasta
- Faça o clone do projeto
```
$ git clone https://github.com/fabiosvf/trilha-nodejs-projeto-03.git .
```
- Instale as dependências do projeto
```
$ npm i
```
- Execute o serviço
```
$ npm run start:dev
```