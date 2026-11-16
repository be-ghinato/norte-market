import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [fields, setFields] = useState({ email: '', password: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await login(fields);
      navigate('/catalogo');
    } catch (err) {
      setError(err?.response?.data?.message || 'E-mail ou senha inválidos.');
    }
  }

  return (
    <section className="section">
      <div className="section__head">
        <span className="section__eyebrow">Entrar</span>
        <h2>Bem-vindo de volta</h2>
        <p>Faça login para acessar seus pedidos e finalizar compras.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="status status--error">{error}</div>}
        <div className="field">
          <label>E-mail</label>
          <input
            required
            type="email"
            value={fields.email}
            onChange={(e) => setFields({ ...fields, email: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Senha</label>
          <input
            required
            type="password"
            value={fields.password}
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
          />
        </div>
        <button type="submit" className="button button--light" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p className="auth-link">
        Não tem uma conta?{' '}
        <Link to="/cadastro" className="button button--ghost">
          Cadastre-se
        </Link>
      </p>
    </section>
  );
}
