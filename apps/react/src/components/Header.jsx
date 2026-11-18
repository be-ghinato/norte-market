import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { user, logout, loading: authLoading } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const cartQty = items.reduce((sum, item) => sum + item.qty, 0);

  function handleLogout() {
    logout();
    navigate('/');
  }

  const authLinks = user ? (
    <>
      <NavLink to="/pedidos" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}>
        Meus pedidos
      </NavLink>
      <NavLink to="/perfil" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}>
        {user.name}
      </NavLink>
      <button className="nav__link nav__link--logout" onClick={handleLogout}>Sair</button>
    </>
  ) : (
    <>
      <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}>
        Entrar
      </NavLink>
      <NavLink to="/cadastro" className="nav__link nav__link--ghost">Criar conta</NavLink>
    </>
  );

  return (
    <header className="header">
      <div className="header__inner">
        <NavLink to="/" className="brand">
          <span className="brand__mark">NM</span>
          <span>
            <strong>Norte Market</strong>
            <small>Sua loja online</small>
          </span>
        </NavLink>
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}
          >
            Início
          </NavLink>
          <NavLink
            to="/catalogo"
            className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}
          >
            Catálogo
          </NavLink>
          <NavLink
            to="/favoritos"
            className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}
          >
            Favoritos
          </NavLink>
          {authLinks}
          <NavLink
            to="/carrinho"
            className="nav__link nav__link--cart"
            aria-label={`Carrinho (${cartQty} itens)`}
          >
            🛒             <span className="nav__badge">{cartQty}</span>
          </NavLink>
        </nav>
        {authLoading && <span className="nav__loading">Entrando...</span>}
      </div>
    </header>
  );
}
