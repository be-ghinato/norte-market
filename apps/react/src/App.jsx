import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Favoritos from './pages/Favoritos';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import MeusPedidos from './pages/MeusPedidos';
import Perfil from './pages/Perfil';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

export default function App() {
  const [favorites, setFavorites] = useState([]);
  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-shell">
          <Header />
          <main className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pedidos" element={<MeusPedidos />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route
                path="/catalogo"
                element={<Catalogo favorites={favorites} onToggleFavorite={toggleFavorite} />}
              />
              <Route
                path="/favoritos"
                element={<Favoritos favorites={favorites} onToggleFavorite={toggleFavorite} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
