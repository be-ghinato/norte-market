import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { filterProducts } from '../utils/catalog';
import { useCart } from '../context/CartContext';

export default function Catalogo({ favorites, onToggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fallbackShown, setFallbackShown] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { add } = useCart();

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (active) {
          setProducts(data);
          // Se não trouxe produtos do backend, usa os padrão
          if (data.length === 0) {
            // Importar produtos padrão inline caso a API venha vazia
            const defaultProducts = [
              {
                id: 1,
                title: 'Notebook Gamer',
                price: 3599.9,
                description: 'Notebook potente para jogos e trabalho',
                category: 'eletronics',
                image: 'https://images.unsplash.com/photo-1495474216165-e6c88622f1b6',
                stock: 10
              },
              {
                id: 2,
                title: 'Mouse Gamer',
                price: 199.9,
                description: 'Mouse com iluminação RGB e ergonomia',
                category: 'eletronics',
                image: 'https://images.unsplash.com/photo-1527866113072-6b03b6e9e7f3',
                stock: 25
              },
              {
                id: 3,
                title: 'Teclado Mecânico',
                price: 349.9,
                description: 'Teclado mecânico com switches azul',
                category: 'eletronics',
                image: 'https://images.unsplash.com/photo-1536440136223-98d97b4b070d',
                stock: 15
              },
              {
                id: 4,
                title: 'Monitor 24 polegadas',
                price: 899.9,
                description: 'Monitor Full HD 144Hz',
                category: 'eletronics',
                image: 'https://images.unsplash.com/photo-1515962290271-4e1a1b3c6a3f',
                stock: 8
              },
              {
                id: 5,
                title: 'Cadeira Gamer',
                price: 799.9,
                description: 'Cadeira ergonômica com apoio de cabeça',
                category: 'moveis',
                image: 'https://images.unsplash.com/photo-1551028718-3e5f4721d175',
                stock: 12
              }
            ];
            setProducts(defaultProducts);
            setFallbackShown(true);
          }
        }
      })
      .catch((err) => {
        if (active) {
          console.error('Erro ao carregar produtos:', err);
          setError(
            'Não foi possível carregar os produtos. Verifique se o backend está rodando.'
          );
          // Em caso de erro, usa produtos fallback tambem
          const defaultProducts = [
            {
              id: 1,
              title: 'Notebook Gamer',
              price: 3599.9,
              description: 'Notebook potente para jogos e trabalho',
              category: 'eletronics',
              image: 'https://images.unsplash.com/photo-1495474216165-e6c88622f1b6',
              stock: 10
            },
            {
              id: 2,
              title: 'Mouse Gamer',
              price: 199.9,
              description: 'Mouse com iluminação RGB e ergonomia',
              category: 'eletronics',
              image: 'https://images.unsplash.com/photo-1527866113072-6b03b6e9e7f3',
              stock: 25
            },
            {
              id: 3,
              title: 'Teclado Mecânico',
              price: 349.9,
              description: 'Teclado mecânico com switches azul',
              category: 'eletronics',
              image: 'https://images.unsplash.com/photo-1536440136223-98d97b4b070d',
              stock: 15
            },
            {
              id: 4,
              title: 'Monitor 24 polegadas',
              price: 899.9,
              description: 'Monitor Full HD 144Hz',
              category: 'eletronics',
              image: 'https://images.unsplash.com/photo-1515962290271-4e1a1b3c6a3f',
              stock: 8
            },
            {
              id: 5,
              title: 'Cadeira Gamer',
              price: 799.9,
              description: 'Cadeira ergonômica com apoio de cabeça',
              category: 'moveis',
              image: 'https://images.unsplash.com/photo-1551028718-3e5f4721d175',
              stock: 12
            }
          ];
          setProducts(defaultProducts);
          setFallbackShown(true);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );
  const filtered = useMemo(
    () => filterProducts(products, search, category),
    [products, search, category]
  );

  return (
    <section className="section">
      <div className="section__head">
        <span className="section__eyebrow">Catálogo</span>
        <h2>Explore os produtos</h2>
        <p>
          Confira nossa seleção completa. Use a busca ou filtre por categoria para
          encontrar o que procura.
        </p>
      </div>
      <div className="toolbar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome..."
          aria-label="Buscar produtos"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filtrar categoria"
        >
          <option value="">Todas as categorias</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {loading && <div className="status">Carregando produtos...</div>}
      {error && !fallbackShown && <div className="status status--error">{error}</div>}
      {!loading &&
        !error &&
        !fallbackShown &&
        <div className="product-grid">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={() => add(product)}
            />
          ))}
        </div>}
      {fallbackShown && !error && <div className="status status--info">Produtos carregados do sistema</div>}
      {!loading && !error && filtered.length === 0 && (
        <div className="status">Nenhum produto encontrado.</div>
      )}
    </section>
  );
}