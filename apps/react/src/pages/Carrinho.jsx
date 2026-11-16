import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/catalog';

export default function Carrinho() {
  const { items, changeQty, remove, clear, total } = useCart();
  const [checkoutError, setCheckoutError] = useState('');

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="section__head">
          <span className="section__eyebrow">Carrinho</span>
          <h2>Seu carrinho está vazio</h2>
        </div>
        <div className="status">
          Você ainda não adicionou nenhum produto.{' '}
          <Link to="/catalogo">Explorar catálogo</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section__head">
        <span className="section__eyebrow">Carrinho</span>
        <h2>Itens selecionados</h2>
      </div>
      <div className="cart-list">
        {items.map((item) => (
          <article className="cart-row" key={item.id}>
            <img src={item.image} alt={item.title} className="cart__thumb" />
            <div className="cart__info">
              <h3>{item.title}</h3>
              <span className="cart__price">{formatPrice(item.price)}</span>
              <div className="cart__controls">
                <button
                  onClick={() => changeQty(item.id, -1)}
                  aria-label="Diminuir quantidade"
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => changeQty(item.id, 1)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>
            </div>
            <button onClick={() => remove(item.id)} className="button button--ghost">
              Remover
            </button>
          </article>
        ))}
      </div>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        {checkoutError && <div className="status status--error">{checkoutError}</div>}
        <button className="button button--light button--full" onClick={() => setCheckoutError('')}>
          Finalizar compra
        </button>
        <button
          className="button button--ghost button--full"
          onClick={() => {
            clear();
            setCheckoutError('');
          }}
        >
          Limpar carrinho
        </button>
      </div>
    </section>
  );
}
