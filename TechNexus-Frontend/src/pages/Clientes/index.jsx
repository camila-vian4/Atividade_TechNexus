import { useState, useEffect } from 'react';
import api from '../../service';
import './style.css';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [erro, setErro] = useState('');

  const buscarClientes = async () => {
    try {
      const resposta = await api.get('/clientes');
      setClientes(resposta.data);
      setErro('');
    } catch (error) {
      setErro('Não foi possível carregar a lista de clientes. Certifique-se de que o Back-end está rodando.');
    }
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  const cadastrarCliente = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clientes', { nome, email, telefone, cpf });
      setNome('');
      setEmail('');
      setTelefone('');
      setCpf('');
      buscarClientes();
      alert('Cliente cadastrado com sucesso!');
    } catch (error) {
      setErro('Falha ao cadastrar o cliente. Verifique a conexão ou os dados enviados.');
    }
  };

  return (
    <div className="modulo-container">
      <h2>Módulo de Clientes</h2>
      
      {erro && <div className="alerta-erro">{erro}</div>}

      <form onSubmit={cadastrarCliente} className="formulario-nexus">
        <h3>Cadastrar Novo Cliente</h3>
        <div className="campo">
          <label>Nome Completo:</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
        </div>
        <div className="campo">
          <label>E-mail:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Telefone:</label>
          <input type="text" value={telefone} onChange={e => setTelefone(e.target.value)} required />
        </div>
        <div className="campo">
          <label>CPF:</label>
          <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} required />
        </div>
        <button type="submit" className="btn-nexus">Salvar Registro</button>
      </form>

      <div className="tabela-secao">
        <h3>Lista de Clientes Cadastrados</h3>
        {clientes.length === 0 ? (
          <p className="vazio">Nenhum registro encontrado.</p>
        ) : (
          <table className="tabela-nexus">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>CPF</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c, index) => (
                <tr key={index}>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>{c.telefone}</td>
                  <td>{c.cpf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}