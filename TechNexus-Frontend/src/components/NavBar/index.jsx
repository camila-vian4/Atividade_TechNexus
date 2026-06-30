import { Link } from 'react-router-dom';
import './style.css';

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ERP Nexus</Link>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
        <li><Link to="/funcionarios">Funcionários</Link></li>
      </ul>
    </nav>
  );
}