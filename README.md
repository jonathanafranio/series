# Series

Baseando nos [vídeos](https://bityli.com/olMdM) do [@arthurzeras](https://github.com/arthurzeras) sobre VueX.

Nessa aplicação, o usuário pode administrar uma lista séries/filmes de sua preferência e as assistidas, usando Vue.js e consumindo uma API Rest e manter a sessão usando token JWT.
Porém não fiz exatamente igual foi ministrado nos vídeos dele.

As diferenças que no [projeto original](https://github.com/arthurzeras/series-wished) para este:
- Não usei Vue Resource para tratar e retorna as promises, eu usei Fetch;
- No projeto original o Sass e usado com a sintaxe SCSS, eu usei a sintaxe SASS;
- As Rotas (routes) e as stores do Vuex (states, getters, mutations e actions), o Artur fez modulando e separando por vários arquivos em cada pasta das páginas, eu não conseguir assimilar bem e por isso que fiz as rotas todas declaradas em um único arquivo: `src/router/index.js` e os stores do Vuex declaradas em um único arquivo: `src/store/index.js`.
Com o tempo, quando estiver com mais prática em Vuex, poderei fazer as stores separado por módulos;
- Acrescentei preloads nos botões enquanto nao retorna as promises e os resultados serão apresentados com modals ao invés de alert;
- Algumas diferenças de css no layout como cores usadas, tamanho máximo de container (1200px), responsivo;

### Usuário de teste
Para testar pode ser usado esse login: `mblader0@umich.edu` e a senha: `pOKJof0PWZ`

### Instalando as dependências
```
npm install
```

### Rodando o projeto
```
npm run serve
```

### Compila e minimiza para produção
```
npm run build
```

### Sobre a API
A api que foi usada está disponível nesta URL: https://guarded-headland-11685.herokuapp.com.

Não trabalhei com a API local, porque não era o meu foco mexer na API e sim consumir as informações dela.

Caso queira trabalhar com ela local:
 - clona o repositório do [@arthurzeras](https://github.com/arthurzeras/series-wished#rodando-a-api-em-sua-m%C3%A1quina);
 - Pega a pasta webserver;
 - Na webserver, instale as dependências `npm i`
 - Rode a API npm `run start`
 - Na linha 7 do arquivo: `series/src/store/index.js`, edite a constante `baseUrl` para a url local;

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
