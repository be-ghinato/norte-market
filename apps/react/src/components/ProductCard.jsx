export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, isAdmin, onEdit, onDelete }) {
  return (
    <article className="product-card">
      <div className="product-card__image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3>{product.title}</h3>
        <p>{product.description.slice(0, 110)}...</p>
        <div className="product-card__bottom">
          <strong>R$ {product.price.toFixed(2).replace('.', ',')}</strong>
          <div style="display: flex; gap: 4px; flex-wrap: wrap;">
            <button onClick={() => onToggleFavorite(product.id)}>
              {isFavorite ? '★ Salvo' : '☆ Favoritar'}
            </button>
            <button onClick={() => onAddToCart(product)}>Adicionar ao carrinho</button>
            {isAdmin && (
              <>
                <button className="button button--ghost" onClick={() => onEdit(product)} style="padding: 7px 9px; font-size: 10px;">Editar</button>
                <button className="button button--ghost" onClick={() => onDelete(product.id)} style="padding: 7px 9px; font-size: 10px; color: #e05d5d; border-color: #e05d5d;">Excluir</button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
