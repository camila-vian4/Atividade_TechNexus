import { useState, useEffect } from 'react';
import api from '../../service';
import './style.css';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [setor, setSetor] = useState('');
  const [erro, setErro] = useState('');

  const buscarFuncionarios = async () => {
    try {
      const resposta = await api.get('/funcionarios');
      setFuncionarios(resposta.data);
      setErro('');
    } catch (error) {
      setErro('Não foi possível carregar a lista de funcionários. Certifique-se de que o Back-end está rodando.');
    }
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const cadastrarFuncionario = async (e) => {
    e.preventDefault();
    try {
      await api.post('/funcionarios', { nome, email, telefone, cargo, setor });
      setNome('');
      setEmail('');
      setTelefone('');
      setCargo('');
      setSetor('');
      buscarFuncionarios();
      alert('Funcionário cadastrado com sucesso!');
    } catch (error) {
      setErro('Falha ao cadastrar o funcionário. Verifique a conexão ou os dados enviados.');
    }
  };

  return (
    <div className="modulo-container">
      <h2>Módulo de Funcionários</h2>
      
      {erro && <div className="alerta-erro">{erro}</div>}

      <form onSubmit={cadastrarFuncionario} className="formulario-nexus">
        <h3>Cadastrar Novo Funcionário</h3>
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
          <label>Cargo:</label>
          <input type="text" value={cargo} onChange={e => setCargo(e.target.value)} required />
        </div>
        <div className="campo">
          <label>Setor:</label>
          <input type="text" value={setor} onChange={e => setSetor(e.target.value)} required />
        </div>
        <button type="submit" className="btn-nexus">Salvar Registro</button>
      </form>

      <div className="tabela-secao">
        <h3>Lista de Funcionários Cadastrados</h3>
        {funcionarios.length === 0 ? (
          <p className="vazio">Nenhum registro encontrado.</p>
        ) : (
          <table className="tabela-nexus">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cargo</th>
                <th>Setor</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((f, index) => (
                <tr key={index}>
                  <td>{f.nome}</td>
                  <td>{f.email}</td>
                  <td>{f.telefone}</td>
                  <td>{f.cargo}</td>
                  <td>{f.setor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}