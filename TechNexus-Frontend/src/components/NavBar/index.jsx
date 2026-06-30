import { Link } from 'react-router-dom';
import './style.css';

export default function NavBar({ tema, aoAlternarTema }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ERP Nexus</Link>
      </div>
      
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/funcionarios">Funcionários</Link></li>
        <li>
          <button onClick={aoAlternarTema} className="btn-tema">
            {tema === 'dark' ? '☀️LIGHT' : '🌙DARK'}
          </button>
        </li>
      </ul>
    </nav>
  );
}