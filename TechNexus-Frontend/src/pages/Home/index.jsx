import './style.css';

export default function Home() {
  return (
    <div className="home-dashboard">
      <h1>Painel de Controle Interno</h1>
      <p className="subtitulo">Mínimo Produto Viável (MVP) do ecossistema ERP Nexus.</p>
      
      <div className="cards-resumo">
        <div className="card-status">
          <h3>Status do Sistema</h3>
          <p>Integração assíncrona com API Spring Boot ativa.</p>
        </div>
        <div className="card-status">
          <h3>Operações Disponíveis</h3>
          <p>Gerenciamento completo de Parceiros, Clientes e Colaboradores.</p>
        </div>
      </div>
    </div>
  );
}