import './style.css';

export default function Header() {
  return (
    <header className="header-nexus">
      <div className="header-status">
        <span className="badge-online"></span> Sistema Operacional
      </div>
      <div className="header-user">
        <span>Olá, <strong>Operador TechNexus</strong></span>
      </div>
    </header>
  );
}