import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Clientes from './pages/Clientes';
import Funcionarios from './pages/Funcionarios';
import './App.css';

function App() {
  return (
    <Router>
      {/* A NavBar fica fixa no topo em todas as telas */}
      <NavBar />
      
      <main className="container-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;