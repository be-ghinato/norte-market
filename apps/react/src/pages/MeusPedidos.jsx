import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getMyOrders } from '../services/api';
import { formatPrice } from '../utils/catalog';

const STATUS_LABEL = {
  pendente: 'Pendente',
  pago: 'Pago',
  enviado: 'Enviado',
  entregue: 'Entregue',
  cancelado: 'Cancelado'
};

export default function MeusPedidos() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading || !user) return;
    let active = true;
    getMyOrders()
      .then((data) => {
        if (active) setOrders(data);
      })
      .catch(() => {
        if (active)
          setError('Não foi possível carregar seus pedidos.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  if (authLoading || loading) {
    return <section className="section"><div className="status">Carregando pedidos...</div></section>;
  }

  if (!user) {
    return (
      <section className="section">
        <div className="section__head">
          <span className="section__eyebrow">Login necessário</span>
          <h2>Meus pedidos</h2>
        </div>
        <div className="status">Faça login para ver seus pedidos.</div>
        <Link to="/login" className="button button--light">Fazer login</Link>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="section">
        <div className="section__head">
          <span className="section__eyebrow">Meus pedidos</span>
          <h2>Você ainda não tem pedidos</h2>
        </div>
        <div className="status">
          Realize sua primeira compra no catálogo.
        </div>
        <Link to="/catalogo" className="button button--light">Explorar catálogo</Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section__head">
        <span className="section__eyebrow">Meus pedidos</span>
        <h2>Seus pedidos</h2>
        <p>Acompanhe o status das suas compras.</p>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Total</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{formatPrice(order.total)}</td>
              <td>
                <span className={`badge badge--${order.status}`}>
                  {STATUS_LABEL[order.status] || order.status}
                </span>
              </td>
              <td>{new Date(order.created_at).toLocaleDateString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
