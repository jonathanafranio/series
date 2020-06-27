# series

Baseando nos vídeos do @arthurzeras sobre VueX, onde ele ensina fazer uma lista séries/filmes de sua preferência, usando Vue.js, consumindo uma API Rest e manter a sessão usando token JWT.
Porém não fiz exatamente igual foi ministrado nos vídeos dele.
As diferenças que no projeto original (https://github.com/arthurzeras/series-wished):
- Não usei Vue Resource para tratar e retorna promises, eu usei Fetch;
- No projeto original o Sass e usado com a sintaxe SCSS, eu usei a sintaxe SASS;
- As Rotas (routes) e os states, getters, mutations, actions do Vuex, o Artur fez modulando e separando por vários arquivos em cada pasta das páginas, eu não conseguir assimilar bem e por isso que fiz as rotas todas declaradas em um único arquivo: `src/router/index.js` e os states, getters, mutations e actions declaradas em um único arquivo: `src/store/index.js`.
Com o tempo, quando estiver com mais prática com Vuex, poderei faze as stores separado por módulos;
- Acrescentei preloads nos botões, e os resultados das ações serão apresentados com modals ao invés de alert;
- Algumas diferenças de css no layout como cores, tamanho máximo de container (1200px), responsivo;

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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
