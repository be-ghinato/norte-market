import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';

export default function Favoritos({ favorites, onToggleFavorite }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    getProducts()
      .then(data => { if (active) setProducts(data); })
      .catch(() => { if (active) setError('Não foi possível carregar os produtos. Tente novamente em instantes.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return <section className="section">
    <div className="section__head">
      <span className="section__eyebrow">Sua lista</span>
      <h2>Seus produtos favoritos</h2>
      <p>Os produtos que você marcou no catálogo ficam salvos aqui para você rever quando quiser.</p>
    </div>
    {loading && <div className="status">Carregando favoritos...</div>}
    {error && <div className="status status--error">{error}</div>}
    {!loading && !error && favoriteProducts.length === 0 && (
      <div className="status">
        Você ainda não favoritou nenhum produto. <Link to="/catalogo">Explorar catálogo</Link>
      </div>
    )}
    <div className="favorites">
      {favoriteProducts.map(product => (
        <article className="favorite-row" key={product.id}>
          <img src={product.image} alt={product.title} />
          <div>
            <h3>{product.title}</h3>
            <span>{product.category} · R$ {product.price.toFixed(2).replace('.', ',')}</span>
          </div>
          <button onClick={() => onToggleFavorite(product.id)}>Remover</button>
        </article>
      ))}
    </div>
  </section>;
}
