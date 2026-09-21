import { Link } from 'react-router-dom';
export default function NotFound(){return <section className="not-found"><span className="section__eyebrow">404</span><h1>Página não encontrada.</h1><p>A rota informada não existe.</p><Link className="button button--dark" to="/">Voltar ao início</Link></section>}
