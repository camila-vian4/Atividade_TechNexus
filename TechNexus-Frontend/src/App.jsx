import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/index';
import NavBar from './components/NavBar/index';
import Footer from './components/Footer/index';
import Home from './pages/Home/index';
import Clientes from './pages/Clientes/index';
import Funcionarios from './pages/Funcionarios/index';
import './App.css';

function App() {
  return (
    <Router>
      {/* Estrutura de Layout Global do ERP */}
      <Header />
      <NavBar />
      
      <main className="container-principal">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/funcionarios" element={<Funcionarios />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;