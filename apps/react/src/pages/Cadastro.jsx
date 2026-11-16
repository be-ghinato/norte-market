import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Cadastro() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [fields, setFields] = useState({ name: '', email: '', password: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    try {
      await register(fields);
      navigate('/login');
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Não foi possível cadastrar. Tente novamente.'
      );
    }
  }

  return (
    <section className="section">
      <div className="section__head">
        <span className="section__eyebrow">Criar conta</span>
        <h2>Cadastre-se</h2>
        <p>Crie sua conta para acompanhar seus pedidos e salvar favoritos.</p>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        {error && <div className="status status--error">{error}</div>}
        <div className="field">
          <label>Nome completo</label>
          <input
            required
            type="text"
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
          />
        </div>
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
          <label>Senha (mínimo 6 caracteres)</label>
          <input
            required
            type="password"
            minLength={6}
            value={fields.password}
            onChange={(e) => setFields({ ...fields, password: e.target.value })}
          />
        </div>
        <button type="submit" className="button button--light" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <p className="auth-link">
        Já tem uma conta?{' '}
        <Link to="/login" className="button button--ghost">
          Fazer login
        </Link>
      </p>
    </section>
  );
}
