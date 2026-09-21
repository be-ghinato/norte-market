# Roteiro de apresentação — AV1 Programação III

## Duração sugerida: 7–9 minutos

### 1. Abertura — 45s
“Nosso projeto se chama Norte Market. Ele é um catálogo de produtos criado para aplicar os conteúdos das Aulas 02 a 05. Nesta AV1 a aplicação é 100% front-end e os dados vêm de uma API pública, enquanto o back-end próprio ficará para a próxima etapa.”

Mostrar rapidamente o projeto publicado.

### 2. Estrutura do projeto — 60s
Abrir o GitHub e mostrar:
- `apps/react/src/components`
- `pages`
- `services`
- `styles`
- `tests`
- `apps/institutional/app`

Explicar que existem duas aplicações: React/Vite e a página institucional Next/Tailwind.

### 3. Rotas — 60s
No site React, clicar:
- Início
- Catálogo
- Favoritos

Falar: “A navegação acontece com React Router e não precisamos recarregar a página.”

Também acessar uma rota inexistente e mostrar o 404.

### 4. API pública — 90s
Abrir o Catálogo.

Mostrar os produtos carregados.

Demonstrar a busca e o filtro de categoria.

Explicar: “O catálogo faz uma requisição GET usando Axios. Os dados chegam em um array de objetos e são renderizados com map e key.”

Mostrar rapidamente `src/services/api.js` e `Catalogo.jsx`.

### 5. useState e useEffect — 60s
Mostrar a página Favoritos.

Clicar em “Adicionar ação” algumas vezes e mostrar o número mudando.

Explicar que `useState` armazena o estado e o setter provoca nova renderização.

No catálogo, mostrar que `useEffect` inicia o carregamento da API.

### 6. SCSS e responsividade — 90s
Abrir `main.scss`.

Mostrar:
- variáveis em `_variables.scss`;
- mixin em `_mixins.scss`;
- nesting em `main.scss`;
- media queries de 640px e 960px.

Abrir DevTools e demonstrar celular, tablet e desktop.

### 7. Next.js + Tailwind — 60s
Abrir o link da página institucional.

Mostrar rapidamente que é uma aplicação separada em Next.js e que a interface usa classes Tailwind responsivas como `sm:`, `md:` e `lg:`.

### 8. Testes — 60s
No terminal:
```bash
cd apps/react
npm test
```

Mostrar o resultado real com os dois testes passando.

Explicar:
1. teste do filtro por título/categoria;
2. teste de formatação de preço.

### 9. Encerramento — 30s
“Com isso demonstramos os requisitos das Aulas 02 a 05: GitHub e SCSS, responsividade e JavaScript, React com componentes/hooks/rotas, consumo de API com Axios, Next.js com Tailwind, testes e os dois deploys na Vercel.”

## Divisão sugerida entre integrantes
Se forem 4 integrantes:
- Integrante 1: abertura + arquitetura.
- Integrante 2: React + rotas + useState.
- Integrante 3: API + SCSS + responsividade.
- Integrante 4: Next/Tailwind + testes + deploy.

O professor determina que todos os integrantes participem da apresentação. fileciteturn0file0L56-L66
