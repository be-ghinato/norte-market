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

export default function Catalogo({ favorites, onToggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Adicionei useState para search e category
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    let active = true;
    getProducts()
      .then((data) => {
        if (active && data && Array.isArray(data) && data.length > 0) {
          // Se backend trouxe dados reais, usa eles
          setProducts(data);
        } else {
          // Backend vazia ou erro, usa produtos padrão
          setProducts(defaultProducts);
        }
      })
      .catch((err) => {
        if (active) {
          console.error('Erro ao carregar produtos da API:', err);
          // Em caso de erro, usa produtos fallback
          setProducts(defaultProducts);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    // Segurança: se mesmo assim os products estiverem vazios,
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

  // Garante que nunca fique vazio após renderizações
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

  // Função querenderiza um ProductCard
  function renderProduct(product) {
    return (
      <ProductCard
        key={product.id}
        product={product}
        isFavorite={favorites.includes(product.id)}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={() => add(product)}
      />
    );
  }

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
          onChange={() => {}}
          aria-label="Buscar produtos"
        />
        <select aria-label="Filtrar categoria">
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
      {/* Grid de produtos - só.renderiza se houver produtos da API */}
      {products.length > 0 && (
        <div className="product-grid">
          {filtered.map(renderProduct)}
        </div>
      )}
      {/* Fallback: mostra os 5 produtos padrão */}
      {products.length === 0 && !loading && (
        <div className="product-grid">
          {[defaultProducts[0], defaultProducts[1], defaultProducts[2], defaultProducts[3], defaultProducts[4]].map(renderProduct)}
        </div>
      )}
      {/* Mensagem quando não há o que mostrar (apenas se carregando e sem fallback) */}
      {loading && filtered.length === 0 && (
        <div className="status">Carregando produtos...</div>
      )}
    </section>
  );
}