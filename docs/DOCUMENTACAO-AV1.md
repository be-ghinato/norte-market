# DOCUMENTAÇÃO OFICIAL — AV1 Programação III — Full Stack

## 1. Identificação
**Projeto:** Norte Market — catálogo inteligente de produtos  
**Semestre:** 2026/2  
**Modalidade:** Projeto integrador — Front-end  
**Integrantes:** preencher com os nomes oficiais do grupo antes da entrega.

## 2. Contexto e objetivo
A avaliação solicita a aplicação dos conteúdos das Aulas 02 a 05 e determina que esta etapa seja 100% front-end, com dados vindos de APIs públicas; o back-end próprio fica para o Módulo 2/AV2. fileciteturn0file0L6-L18

O Norte Market foi idealizado como um catálogo de produtos. A aplicação principal consome a Fake Store API via Axios, permite busca/filtro, favoritos e navegação por rotas. Uma segunda aplicação, institucional, foi criada em Next.js com Tailwind CSS.

## 3. Arquitetura
```text
av1-fullstack-2026/
├── apps/
│   ├── react/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── styles/
│   │   │   └── utils/
│   │   ├── tests/
│   │   └── package.json
│   └── institutional/
│       ├── app/
│       ├── package.json
│       └── postcss.config.mjs
├── docs/
└── presentation/
```

## 4. Evidências por aula

### Aula 02 — Git/GitHub, SCSS, Box Model e Flexbox
O enunciado exige repositório público com histórico de commits, SCSS com variáveis, nesting e pelo menos um mixin, Flexbox e Box Model. fileciteturn0file0L20-L24

**Onde está aplicado:**
- `apps/react/src/styles/_variables.scss`: variáveis de cores, espaçamento visual, raio e sombra.
- `apps/react/src/styles/_mixins.scss`: mixins `focus-ring` e `container`.
- `apps/react/src/styles/main.scss`: nesting em `.header`, `.brand`, `.button` e outros componentes.
- `box-sizing: border-box`, padding, margin e border estão no CSS global e nos componentes.
- Flexbox aparece no cabeçalho, menu, botões, cards e rodapé.

**Evidência de entrega:** o histórico deve ser criado pelo grupo no GitHub. Recomenda-se commits separados por etapa, por exemplo: `feat: estrutura react`, `feat: consumo da api`, `feat: pagina institucional`, `test: adiciona testes`, `docs: documentação av1`.

### Aula 03 — Responsividade e JavaScript
O enunciado exige meta viewport, mobile-first, pelo menos duas media queries e três faixas de tela, além de variáveis, tipos, condicionais, loops, arrays, objetos, funções e eventos. fileciteturn0file0L25-L30

**Onde está aplicado:**
- `apps/react/index.html`: meta viewport.
- `main.scss`: base mobile-first + `@media (min-width: 640px)` e `@media (min-width: 960px)`.
- `map()` no catálogo e nos links.
- arrays de produtos, categorias e favoritos.
- objetos retornados pela API.
- `filter()` para busca/categoria.
- eventos `onChange`, `onClick` e `onSubmit`.
- condicionais de carregamento, erro e lista vazia.

### Aula 04 — React, componentes, hooks e rotas
O enunciado exige Vite, ao menos três componentes reutilizáveis, `useState`, `map` + `key` e ao menos três rotas com React Router e menu usando Link. fileciteturn0file0L31-L36

**Componentes:** `Header`, `Footer`, `ProductCard` e páginas.

**Hooks:** `Catalogo.jsx` utiliza `useState`, `useEffect` e `useMemo`; `Favoritos.jsx` utiliza `useState`.

**Rotas:** `/`, `/catalogo`, `/favoritos` e `*` para 404.

**Lista:** produtos são renderizados com `map()` e `key={product.id}`.

### Aula 05 — API, Next.js, Tailwind, testes e deploy
O enunciado exige GET com Axios, `useState` + `useEffect`, `map`, página institucional em Next.js com Tailwind e responsividade `sm/md/lg`, dois testes e deploy das duas aplicações na Vercel. fileciteturn0file0L37-L43

**API:** `apps/react/src/services/api.js` usa Axios e `GET /products` da Fake Store API.

**Estado/efeito:** `Catalogo.jsx` mantém os produtos e o estado de carregamento/erro; `useEffect` executa o carregamento.

**Next/Tailwind:** `apps/institutional/app/page.jsx` é a página institucional e usa classes Tailwind com `sm:`, `md:` e `lg:` conforme necessário.

**Testes:** `apps/react/tests/catalog.test.cjs` contém dois testes Jest: filtro por título/categoria e formatação de preço.

**Deploy:** publicar cada pasta `apps/react` e `apps/institutional` como projeto separado na Vercel.

## 5. API pública
**Fake Store API:** `https://fakestoreapi.com/products`

Exemplo de objeto consumido:
```json
{
  "id": 1,
  "title": "...",
  "price": 109.95,
  "description": "...",
  "category": "men's clothing",
  "image": "https://..."
}
```

A avaliação cita APIs públicas como exemplos e determina que os dados desta etapa venham de APIs públicas. fileciteturn0file0L15-L18

## 6. Testes
Executar:
```bash
cd apps/react
npm install
npm test
```

O resultado esperado é a aprovação dos dois testes do arquivo `catalog.test.cjs`.

Para a documentação entregue no Classroom, incluir um print real do terminal após executar `npm test`, pois o enunciado exige essa evidência. fileciteturn0file0L48-L55

## 7. Deploy Vercel
Criar dois projetos Vercel a partir do mesmo repositório:

**Projeto 1 — React**
- Root Directory: `apps/react`
- Build Command: `npm run build`
- Output Directory: `dist`

**Projeto 2 — Next**
- Root Directory: `apps/institutional`
- Framework: Next.js
- Build Command: `npm run build`

O enunciado exige links públicos da Vercel para as duas aplicações. fileciteturn0file0L48-L55

## 8. Checklist final
- [ ] Nomes dos integrantes preenchidos.
- [ ] Repositório público.
- [ ] Histórico de commits do grupo.
- [ ] `npm install` e `npm run dev` funcionando no React.
- [ ] `npm test` com dois testes passando.
- [ ] React publicado na Vercel.
- [ ] Next publicado na Vercel.
- [ ] Print da estrutura de pastas.
- [ ] Prints das evidências por aula.
- [ ] Print do `npm test`.
- [ ] Links finais adicionados ao Classroom.
- [ ] Todos os integrantes preparados para participar da apresentação.

O enunciado informa entrega de links/documentação em 22/09 e apresentação em 22/09. fileciteturn0file0L76-L80
