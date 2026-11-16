import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { createOrder, getToken } from '../services/api';
import { formatPrice } from '../utils/catalog';

export default function Checkout() {
  const { user } = useAuth();
  const { items, clear, total } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return (
      <section className="section">
        <div className="section__head">
          <span className="section__eyebrow">Login necessário</span>
          <h2>Faça login para finalizar a compra</h2>
        </div>
        <div className="status">
          Você precisa estar logado para criar um pedido.
        </div>
        <div style={{ marginTop: 16 }}>
          <Link to="/login" className="button button--light">Fazer login</Link>{' '}
          <Link to="/cadastro" className="button button--ghost">Criar conta</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="section__head">
          <span className="section__eyebrow">Carrinho vazio</span>
          <h2>Adicione itens antes de finalizar</h2>
        </div>
        <div className="status">
          Seu carrinho está vazio.{' '}
          <Link to="/catalogo">Explorar catálogo</Link>
        </div>
      </section>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createOrder({
        user_id: user.id,
        total,
        status: 'pendente'
      });
      clear();
      navigate('/pedidos');
    } catch (err) {
      setError(err?.response?.data?.message || 'Não foi possível finalizar o pedido.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="section__head">
        <span className="section__eyebrow">Checkout</span>
        <h2>Finalizar compra</h2>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        {error && <div className="status status--error">{error}</div>}
        <div className="checkout__meta">
          <div>
            <strong>Cliente:</strong> {user.name} ({user.email})
          </div>
          <div>
            <strong>Itens:</strong> {items.reduce((sum, i) => sum + i.qty, 0)}
          </div>
          <div>
            <strong>Total:</strong> {formatPrice(total)}
          </div>
        </div>
        <div className="checkout__items">
          {items.map((item) => (
            <div className="checkout__item" key={item.id}>
              <span>{item.title} × {item.qty}</span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <button type="submit" className="button button--light button--full" disabled={submitting}>
          {submitting ? 'Finalizando...' : 'Confirmar pedido'}
        </button>
      </form>
      <p style={{ marginTop: 12 }}>
        <Link to="/carrinho" className="button button--ghost">Voltar ao carrinho</Link>
      </p>
    </section>
  );
}
