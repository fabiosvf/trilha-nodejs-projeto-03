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

## Trabalhando com ORM - Object Relational Mapper
- Existem várias formas de trabalhar com banco de dados no Node.js;
  - Lib nativa do banco de dados
    - Como estamos trabalhando com o banco de dados `PostgreSQL`, a lib nativa é o `pg` que pode ser acessado a partir do site https://node-postgres.com/
    - Neste caso, os códigos SQL devem ser escritos manualmente e são aplicáveis apenas ao banco de dados nativo. Caso haja a necessidade de alterar o Banco de Dados, é possível que parte do códgio precise ser reescrito para se adaptar à mudança.
  - Query Builders
    - Os query builds possuem um nível de abstração mais alto, pois através dessas bibliotecas é possível criar queries utilizando métodos do JavaScript, e a lib se encarrega de converter para o código SQL Nativo. A parte legal é que é possível mudar de banco de dados sem precisar reescrever a aplicação.
    - E um dos mais populares no momento é o `Knex.js`, que pode ser acessado à partir do link https://knexjs.org/
  - ORMs (Object Relational Mapper)
    - E por último temos os ORMs que o nível mais alto de abstração, e possui muitos recursos que facilitam o desenvolvimento. Existem várias libs diferentes:
      - `Sequelize` https://sequelize.org/
      - `TypeORM` https://typeorm.io/
      - `Prisma` https://www.prisma.io/
    - Neste projetos iremos utilizar a lib `Prisma` pela compatibilidade e integração nativa com o `TypeScript`, além de migrations automatizadas, dentre outros recursos.
- Para instalar a lib `prisma` como dependência de desenvolvimento, digite:
```
$ npm i prisma -D
```
- Para criar o arquivo com as configurações iniciais do `Prisma` à partir da raiz do projeto, digite o seguinte comando:
```
$ npx prisma init
```
- Será necessário instalar e habilitar a extensão `Prisma` no `VSCode`
- Verifique se a seguinte configuração está habilitada no arquivo `settings.json`:
```json
"[prisma]": {
  "editor.formatOnSave": true
}
```
- Após editar o schema do banco de dados, digite o comanda abaixo para gerar toda a tipagem dos objetos das tabelas de forma dinâmica:
```
$ npx prisma generate
```
- E para realizar a conexão com o banco de dados, vamos precisar instalar a lib `@prisma/client` como dependência de produção. Para isso, digite o comando:
```
$ npm i @prisma/client
```
- Após a configuração do Docker e do Banco de Dados PostgreSQL explicado na próxima sessão, podemos executar migrations automatizadas e até acessar uma ferramenta para visualização das tabelas do banco de dados utilizando o `Prisma`
- Para rodar uma `migration` digite o seguinte comando:
  - Este comando cria uma migration para manter a estrutura de tabelas detalhada no arquivo `./prisma/schema.prisma` sempre atualizada e sincronizada com o banco de dados
  - Lembrando que a banco de dados é acessado considerando a url mapeada no arquivo `./env`
  - Além disso, caso ele detecte que existem alterações na estrutura de tabelas, este irá solicitar um nome para a atividade, afim de criar a migration personalizada.
```
$ npx prisma migrate dev
```
- Para acessar a ferramenta de visualização das tabelas dentro do banco de dados, digite:
```
$ npx prisma studio
```

## Configurando o Docker
- O Docker permite criar ambientes inteiros dentro de uma espécie de imagem, onde podemos instalar o banco de dados e publicar um serviço rodando sem precisar alterar o ambiente da máquina onde o docker estiver instalado. O melhor de tudo é que caso o servidor mude, é possível levar essa imagem do Docker para qualquer outro ambiente, e subí-lo novamente sem interferir nas funcionalidades. Neste caso o ambiente se mantém o mesmo e intacto.
- Uma ideia geral de como o Docker funciona, é parecido com o que ambientes virtualizados como `VirtualBox`, `VMware` e `Hyper-V` fazem. Neste ambiente é possível instalar qualquer tipo de sistema operacional de forma apartada sem interferir no sistema operacional da máquina em que está rodando a máquina virtual. O único problema é que é necessário subir uma estrutura completa de sistema operacional que irá dividir o consumo dos recursos de processamento e memória da máquina em que está rodando. Já com o `Docker` não é preciso instalar todo o sistema operacional, ele possui recursos que permitem instalar apenas o necessário para rodar o banco de dados ou iniciar o serviço de uma api por exemplo. Desta forma, o container irá consumir poucos recursos, apenas o suficiente para rodar a funcionalidade. Isso torna o `Docker` uma opção muito mais rápida e muito mais leve.
- Segue o guia para instalação do Docker:
  - https://docs.docker.com/get-docker/

### Entendendo o Docker Hub
- O Docker Hub é um repositório de imagens. As imagens definem o software disponível nos contêineres. Uma imagem do Docker contém código de aplicativo, bibliotecas, ferramentas, dependências e outros arquivos necessários para executar um aplicativo. Quando alguém executa uma imagem, ela pode se tornar uma ou várias instâncias de um contêiner. Segue o link para acessar as imagens:
  - https://hub.docker.com/
- A imagem oficial para instalação do PostgreSQL está no seguinte link: https://hub.docker.com/_/postgres. No entanto, iremos utilizar a imagem gerenciada pela Bitnami que possui um contexto mais focado em segurança. Segue o link:
  - https://hub.docker.com/r/bitnami/postgresql
- Para instalar a imagem do Postgres gerenciado pela Bitnami, digite o seguinte comando no terminal:
  - Onde `--name` é o nome do container, no nosso caso `api-solid-pg`
  - `-e` é utilizado para passagem de parâmetros na criação do container do nosso banco de dados, no nosso caso passamos três desses parâmetros, são eles:
    - `POSTGRESQL_USERNAME=docker`, nome de usuário
    - `POSTGRESQL_PASSWORD=docker`, senha
    - `POSTGRESQL_DATABASE=apisolid`, nome do banco de dados
  - `-p` é utilizado para especificar a porta em que o banco de dados estará disponível para conexão. Ele é separado em dois valores, um do lado esquerdo dos `:` dois pontos, e um do lado direito, que representam um DE PARA entre o ambiente dentro do container e o ambiente fora do container que irá acessar o banco de dados. Então, quando a gente quer se conectar ao banco de dados do container, acessamos a porta que representa o lado externo da conexão, e o docker se encarrega de traduzir para sua equivalente dentro do container e faz o redirecionamento automático
    - A porta `5432` do lado esquerdo equivale a porta de dentro do container
    - A porta `5432` do lado direito equivale a porta do host/lado externo
  - `bitnami/postgresql` é a imagem de origem de onde contém todas as configurações e os dados para a criação do nosso banco de dados dentro do nosso container do Docker
```
$ docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```

### Comandos básicos do Docker
- Para mostrar a versão do Docker que está instalada, digite:
```
$ docker --version
```
- Para executar uma imagem, como apresentado na sessão anterior, digite:
  - _Se o Docker não encontrar no disco a imagem informada em `NOME_DA_IMAGEM`, então irá procurar no repositório do Docker Hub_
  - _Além disso, como já visto, é possível passar parâmetros na criação da imagem_
```
$ docker run NOME_DA_IMAGEM
```
- Para listar as imagens disponíveis no Docker, digite:
```
$ docker image ls
```
- Para apagar uma imagem, digite:
```
$ docker image rmi NOME_DA_IMAGEM
```
- Para listar todos os contêineres, digite:
  - A partir deste comando é possível obter o `CONTAINER_ID` ou o `NAME` para executar procedimentos específicos com o contêiner, como por exemplo, iniciar, parar ou apagar.
```
$ docker container ls --all
```
- Para listar apenas os contêineres ativos, digite:
```
$ docker container ls
```
- Para iniciar um contêiner, digite:
```
$ docker container start CONTAINER_ID/NAME
```
- Para parar um contêiner, digite:
```
$ docker container start CONTAINER_ID/NAME
```
- Para remover um contêiner, digite:
```
$ docker container rm CONTAINER_ID/NAME
```
- Para listar os logs de um contêiner, digite:
```
$ docker logs CONTAINER_ID/NAME
```
- Para listar todos os contêineres que estão rodando, digite:
```
$ docker ps
```
- Para listar todos os contêires criados, independente do status de execução, digite:
```
$ docker ps -a
```
- Para maiores detalhes, consulte a documentação oficial do Docker. O link a seguir é um tutorial básico dos principais comandos do Docker:
  - https://balta.io/blog/docker-instalacao-configuracao-e-primeiros-passos

### Configurando o Docker Compose
- É possível automatizar a instalação de uma imagem do PostgreSQL, incluindo a criação do Banco de Dados.
- Para isso, crie o arquivo `docker-compose.yml` na raiz do projeto
- Agora vamos traduzir o comando abaixo
```
$ docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
```
- na linguagem que o `docker-compose.yml` entende
```
version: '3'

services:
  api-solid-pg:
    image: bitnami/postgresql
    ports:
      - 5432:5432
    environment:
      - POSTGRESQL_USERNAME=docker
      - POSTGRESQL_PASSWORD=docker
      - POSTGRESQL_DATABASE=apisolid
```
- Com o arquivo de configuração do Docker criado, basta digitar o seguinte comando para instalar e iniciar o serviço do Banco de Dados:
  - _O parâmetro `-d` executa o comando em modo `detach`, ou seja, não prende a linha de comando, e o processo fica executando em segundo plano (background)._
```
$ docker compose up -d
```
- Para parar todos os contêineres da aplicação que estão configurados no arquivo `docker-compose.yml` basta digitar:
```
$ docker compose stop
```
- Agora caso deseje remover todos os contêineres, basta digitar o coamndo:
```
$ docker compose down
```
- É possível também iniciar os contêineres através do comando:
```
$ docker compose start
```

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