# Norte Market

Loja online completa: catálogo de produtos com busca, filtros por categoria e lista de favoritos. Monorepo com duas aplicações:

- **`apps/react`** — aplicação principal da loja (React + Vite + React Router + Axios + SCSS), com dados da [Fake Store API](https://fakestoreapi.com)
- **`apps/institutional`** — página institucional "Sobre nós" (Next.js + Tailwind CSS)

## Como rodar

### Loja (React)
```bash
cd apps/react
npm install
npm run dev        # http://localhost:5173
```

### Página institucional (Next.js)
```bash
cd apps/institutional
npm install
npm run dev        # http://localhost:3000
```

## Testes
```bash
cd apps/react
npm test           # Jest
```

## Deploy
Os dois apps são publicados como projetos separados na Vercel, ambos a partir deste mesmo repositório:

| Projeto Vercel | Root Directory | Framework |
|---|---|---|
| Loja | `apps/react` | Vite |
| Institucional | `apps/institutional` | Next.js |
