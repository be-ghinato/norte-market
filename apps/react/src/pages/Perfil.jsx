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

export default function Perfil() {
  const { user, loading: authLoading, logout } = useAuth();
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

  function handleLogout() {
    logout();
  }

  if (authLoading || loading) {
    return <section className="section"><div className="status">Carregando perfil...</div></section>;
  }

  if (!user) {
    return (
      <section className="section">
        <div className="section__head">
          <span className="section__eyebrow">Login necessário</span>
          <h2>Meu Perfil</h2>
        </div>
        <div className="status">Faça login para acessar seu perfil.</div>
        <Link to="/login" className="button button--light">Fazer login</Link>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section__head">
        <span className="section__eyebrow">Meu Perfil</span>
        <h2>Bem-vindo, {user.name}</h2>
        <p>Gerencie sua conta e acompanhe seus pedidos.</p>
      </div>

      <div className="info-grid">
        <div className="info-card">
          <h3>Informações da Conta</h3>
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>E-mail:</strong> {user.email}</p>
          <p><strong>Perfil:</strong> <span>{user.role === 'admin' ? 'Administrador' : 'Cliente'}</span></p>
        </div>
        <div className="info-card">
          <h3>Estatísticas</h3>
          <p>Total de pedidos: <span>{orders.length}</span></p>
          <p>Pedidos entregues: <span>{orders.filter(o => o.status === 'entregue').length}</span></p>
          <p>Pedidos pendentes: <span>{orders.filter(o => o.status === 'pendente').length}</span></p>
        </div>
        <div className="info-card">
          <h3>Ações</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link to="/catalogo" className="button button--light">Continuar comprando</Link>
            <Link to="/favoritos" className="button button--ghost">Ver favoritos</Link>
            <button className="button button--dark" onClick={handleLogout} style={{ marginTop: '8px' }}>Sair da conta</button>
          </div>
        </div>
      </div>

      <div className="section__head" style={{ marginTop: '40px' }}>
        <span className="section__eyebrow">Meus Pedidos</span>
        <h2>Histórico de compras</h2>
        <p>Acompanhe o status das suas compras recentes.</p>
      </div>

      {error && <div className="status status--error">{error}</div>}

      {orders.length === 0 ? (
        <div className="status">
          Você ainda não tem pedidos. <Link to="/catalogo" className="button button--light">Explorar catálogo</Link>
        </div>
      ) : (
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
      )}
    </section>
  );
}