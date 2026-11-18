import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts, updateProduct, deleteProduct, createProduct } from '../services/api';
import { filterProducts } from '../utils/catalog';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

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
  const { add } = useCart();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [creating, setCreating] = useState(false);

  async function handleCreateProduct(event) {
    event.preventDefault();
    setCreating(true);
    try {
      const productData = {
        name: newProduct.name,
        price: Number(newProduct.price),
        category: newProduct.category,
        stock: Number(newProduct.stock) || 0
      };
      const created = await createProduct(productData);
      setProducts(prev => [created, ...prev]);
      setShowCreateModal(false);
      setNewProduct({ name: '', price: '', category: '', stock: '' });
    } catch (err) {
      alert('Erro ao criar produto: ' + (err?.response?.data?.message || err.message));
    } finally {
      setCreating(false);
    }
  }

  async function handleEdit(product) {
    // TODO: Implement edit modal/form
    alert(`Editar produto: ${product.title}`);
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Erro ao excluir produto');
    }
  }

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

  // Função para renderizar um ProductCard
  function renderProduct(product) {
    return (
      <ProductCard
        key={product.id}
        product={product}
        isFavorite={favorites.includes(product.id)}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={() => add(product)}
        isAdmin={isAdmin}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
      {isAdmin && (
        <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
          <button className="button button--light" onClick={() => setShowCreateModal(true)}>
            + Novo Produto
          </button>
        </div>
      )}
      <div className="toolbar">
        <input
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Buscar produtos"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Filtrar categoria">
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

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Criar Novo Produto</h3>
            <form onSubmit={handleCreateProduct} style="display: flex; flex-direction: column; gap: 12px;">
              <div className="field">
                <label>Nome</label>
                <input
                  required
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Nome do produto"
                />
              </div>
              <div className="field">
                <label>Preço</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="field">
                <label>Categoria</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  placeholder="Ex: eletronicos, moveis"
                />
              </div>
              <div className="field">
                <label>Estoque</label>
                <input
                  type="number"
                  min="0"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 8px;">
                <button type="button" className="button button--ghost" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="button button--light" disabled={creating}>
                  {creating ? 'Criando...' : 'Criar Produto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}