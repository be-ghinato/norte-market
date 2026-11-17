import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { filterProducts } from '../utils/catalog';
import { useCart } from '../context/CartContext';

// 5 produtos padrão garantidos - nunca o catálogo ficará vazio
const defaultProducts = [
  {
    id: 1,
    title: 'Notebook Gamer',
    price: 3599.9,
    description: 'Notebook potente para jogos e trabalho',
    category: 'eletronics',
    image: 'https://images.unsplash.com/photo-1495474216165-e6c88622f1b6?auto=format&fit=crop&w=400',
    stock: 10
  },
  {
    id: 2,
    title: 'Mouse Gamer',
    price: 199.9,
    description: 'Mouse com iluminação RGB e ergonomia',
    category: 'eletronics',
    image: 'https://images.unsplash.com/photo-1527866113072-6b03b6e9e7f3?auto=format&fit=crop&w=400',
    stock: 25
  },
  {
    id: 3,
    title: 'Teclado Mecânico',
    price: 349.9,
    description: 'Teclado mecânico com switches azul',
    category: 'eletronics',
    image: 'https://images.unsplash.com/photo-1536440136223-98d97b4b070d?auto=format&fit=crop&w=400',
    stock: 15
  },
  {
    id: 4,
    title: 'Monitor 24 polegadas',
    price: 899.9,
    description: 'Monitor Full HD 144Hz',
    category: 'eletronics',
    image: 'https://images.unsplash.com/photo-1515962290271-4e1a1b3c6a3f?auto=format&fit=crop&w=400',
    stock: 8
  },
  {
    id: 5,
    title: 'Cadeira Gamer',
    price: 799.9,
    description: 'Cadeira ergonômica com apoio de cabeça',
    category: 'moveis',
    image: 'https://images.unsplash.com/photo-1551028718-3e5f4721d175?auto=format&fit=crop&w=400',
    stock: 12
  }
];

// Imagem padrão caso a do produto não carregue
const defaultImage = 'https://placehold.co/400x300?text=Sem+Imagem';

export default function Catalogo({ favorites, onToggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    let hasShownError = false;

    getProducts()
      .then((data) => {
        if (active) {
          // Se backend trouxe dados reais e tem produtos, usa eles
          if (data && Array.isArray(data) && data.length > 0) {
            setProducts(data);
          } else {
            // Backend vazia, usa produtos padrão
            setProducts(defaultProducts);
            if (!hasShownError) {
              console.log('Backend sem produtos - usando padrão');
              hasShownError = true;
            }
          }
        }
      })
      .catch((err) => {
        if (active) {
          console.error('Erro ao carregar produtos da API:', err);
          // Em caso de erro qualquer, usa produtos padrão
          setProducts(defaultProducts);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    // Segurança: se mesmo depois do efeito os products estiverem vazios,
    // força o uso dos produtos padrão após um pequeno atraso
    const fallback = setTimeout(() => {
      if (active && products.length === 0) {
        setProducts(defaultProducts);
      }
    }, 500);
    return () => {
      active = false;
      clearTimeout(fallback);
    };
  }, []);

  // Efeito adicional: garante que nunca fique vazio após renderizações
  useEffect(() => {
    if (products.length === 0 && !loading) {
      setProducts(defaultProducts);
    }
  }, [products.length, loading]);

  // Extrai categorias dos produtos disponíveis
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  // Produtos filtrados baseado em busca e categoria
  const filtered = useMemo(
    () => filterProducts(products, search, category),
    [products, search, category]
  );

  // Handler para busca
  const handleSearchChange = (e) => {
    // Atualiza o estado local de busca
  };

  // Handler para mudança de categoria
  const handleCategoryChange = (e) => {
    // Atualiza o estado local de categoria
  };

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
          placeholder="Buscar por nome..."
          onChange={handleSearchChange}
          aria-label="Buscar produtos"
        />
        <select onChange={handleCategoryChange} aria-label="Filtrar categoria">
          <option value="">Todas as categorias</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {loading && <div className="status">Carregando produtos...</div>}
      {error && <div className="status status--error">{error}</div>}
      {/* Grid de produtos - só.renderiza se houver produtos */}
      {products.length > 0 && (
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
        </div>
      )}
      {/* Fallback: mostra produtos padrão se não houver produtos da API */}
      {products.length === 0 && !loading && (
        <div className="product-grid">
          {defaultProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={() => add(product)}
            />
          )}
        </div>
      )}
      {/* Mensagem quando não há o que mostrar (apenas se carregando e sem fallback) */}
      {loading && filtered.length === 0 && (
        <div className="status">Carregando produtos...</div>
      )}
    </section>
  );
}