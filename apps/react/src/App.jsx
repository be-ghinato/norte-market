import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Favoritos from './pages/Favoritos';
import NotFound from './pages/NotFound';

export default function App() {
  const [favorites, setFavorites] = useState([]);
  function toggleFavorite(id) {
    setFavorites(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }
  return <div className="app-shell">
    <Header />
    <main className="page-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        <Route path="/favoritos" element={<Favoritos favorites={favorites} onToggleFavorite={toggleFavorite} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
  </div>;
}
