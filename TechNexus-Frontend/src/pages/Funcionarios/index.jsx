import { useState, useEffect } from 'react';
import api from '../../service/index';
import toast from 'react-hot-toast'; // 🎯 Importando o disparador de toasts
import './style.css';

export default function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cargo, setCargo] = useState('');
  const [setor, setSetor] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [idParaDeletar, setIdParaDeletar] = useState(null);

  const buscarFuncionarios = async () => {
    try {
      const resposta = await api.get('/funcionarios');
      setFuncionarios(resposta.data);
    } catch (error) {
      const msgBack = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Não foi possível carregar a lista de funcionários.';
      toast.error(msgBack, { className: 'alerta-erro' });
    }
  };

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  const salvarFuncionario = async (e) => {
    e.preventDefault();
    const dadosFuncionario = { nome, email, telefone, cargo, setor };

    try {
      if (idEdicao) {
        await api.put(`/funcionarios/${idEdicao}`, dadosFuncionario);
        toast.success('Funcionário updated com sucesso!', { className: 'alerta-sucesso' });
        setIdEdicao(null);
      } else {
        await api.post('/funcionarios', dadosFuncionario);
        toast.success('Funcionário cadastrado com sucesso!', { className: 'alerta-sucesso' });
      }
      
      setNome('');
      setEmail('');
      setTelefone('');
      setCargo('');
      setSetor('');
      buscarFuncionarios();
    } catch (error) {
      const msgBack = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Falha ao processar requisição. Verifique os campos.';
      toast.error(msgBack, { className: 'alerta-erro' });
    }
  };

  const prepararEdicao = (objeto) => {
    setIdEdicao(objeto.id);
    setNome(objeto.nome);
    setEmail(objeto.email);
    setTelefone(objeto.telefone);
    
    if (objeto.cargo) {
      setCargo(objeto.cargo);
      setSetor(objeto.setor);
    }

    // 🎯 Rolagem suave para o topo
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const abrirConfirmacaoDelecao = (id) => {
    setIdParaDeletar(id);
    setModalAberto(true);
  };

  const confirmarDelecao = async () => {
    setModalAberto(false);

    try {
      await api.delete(`/funcionarios/${idParaDeletar}`);
      toast.success('Registro removido com sucesso!', { className: 'alerta-sucesso' });
      buscarFuncionarios();
      if (idEdicao === idParaDeletar) {
        setIdEdicao(null);
        setNome(''); setEmail(''); setTelefone(''); setCargo(''); setSetor('');
      }
    } catch (error) {
      const msgBack = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Não foi possível deletar o registro.';
      toast.error(msgBack, { className: 'alerta-erro' });
    }
  };

  return (
    <div className="modulo-container">
      <h2>Módulo de Funcionários</h2>

      <form onSubmit={salvarFuncionario} className="formulario-nexus">
        <h3>{idEdicao ? 'Atualizar Funcionário' : 'Cadastrar Novo Funcionário'}</h3>
        
        <div className="grid-campos">
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
        </div>

        <div className="botoes-form">
          <button type="submit" className="btn-nexus">
            {idEdicao ? 'Atualizar Registro' : 'Salvar Registro'}
          </button>
          {idEdicao && (
            <button type="button" className="btn-cancelar" onClick={() => {
              setIdEdicao(null);
              setNome(''); setEmail(''); setTelefone(''); setCargo(''); setSetor('');
            }}>Cancelar Edição</button>
          )}
        </div>
      </form>

      <div className="tabela-secao">
        <h3>Lista de Funcionários Cadastrados</h3>
        {funcionarios.length === 0 ? (
          <p className="vazio">Nenhum registro encontrado no sistema.</p>
        ) : (
          <table className="tabela-nexus">
            <thead>
              <tr>
                <th className="coluna-acoes">Ações</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Cargo</th>
                <th>Setor</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map((f) => (
                <tr key={f.id || f.email}>
                  <td className="coluna-acoes">
                    <div className="wrapper-botoes">
                      <button className="btn-acao btn-editar" onClick={() => prepararEdicao(f)} title="Editar">✏️</button>
                      <button className="btn-acao btn-deletar" onClick={() => abrirConfirmacaoDelecao(f.id)} title="Deletar">🗑️</button>
                    </div>
                  </td>
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

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-icone">⚠️</div>
            <h3>Confirmar Exclusão</h3>
            <p>Tem certeza absoluta que deseja deletar este funcionário? Esta ação não poderá ser desfeita.</p>
            <div className="modal-botoes">
              <button className="btn-modal-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="btn-modal-confirmar" onClick={confirmarDelecao}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}