import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/index';
import NavBar from './components/NavBar/index';
import Footer from './components/Footer/index';
import Home from './pages/Home/index';
import Clientes from './pages/Clientes/index';
import Funcionarios from './pages/Funcionarios/index';
import './App.css';

function App() {
  const [tema, setTema] = useState('dark');

  useEffect(() => {
    // Aplica o tema diretamente na tag raiz do HTML
    document.documentElement.setAttribute('data-theme', tema);
  }, [tema]);

  const alternarTema = () => {
    setTema(tema === 'dark' ? 'light' : 'dark');
  };

  return (
    <Router>
      <Header />
      {/* Passando o tema atual e a função de clique para a NavBar */}
      <NavBar tema={tema} aoAlternarTema={alternarTema} />
      
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