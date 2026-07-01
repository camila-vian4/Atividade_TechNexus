import { useState, useEffect } from 'react';
import api from '../../service/index';
import toast from 'react-hot-toast'; // 🎯 Importando o disparador de toasts
import './style.css';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [idParaDeletar, setIdParaDeletar] = useState(null);

  const buscarClientes = async () => {
    try {
      const resposta = await api.get('/clientes');
      setClientes(resposta.data);
    } catch (error) {
      // 🎯 Pega a mensagem real do Spring Boot ou usa uma padrão
      const msgBack = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Não foi possível carregar os clientes.';
      toast.error(msgBack, { className: 'alerta-erro' });
    }
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  const salvarCliente = async (e) => {
    e.preventDefault();
    const dadosCliente = { nome, email, telefone, cpf };

    try {
      if (idEdicao) {
        await api.put(`/clientes/${idEdicao}`, dadosCliente);
        toast.success('Cliente atualizado com sucesso!', { className: 'alerta-sucesso' });
        setIdEdicao(null);
      } else {
        await api.post('/clientes', dadosCliente);
        toast.success('Cliente cadastrado com sucesso!', { className: 'alerta-sucesso' });
      }
      
      setNome('');
      setEmail('');
      setTelefone('');
      setCpf('');
      buscarClientes();
    } catch (error) {
      // 🎯 Captura o erro exato de validação ou duplicidade vindo da API
      const msgBack = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Verifique os dados do seu formulário';
      toast.error(msgBack, { className: 'alerta-erro' });
    }
  };

  const prepararEdicao = (objeto) => {
    setIdEdicao(objeto.id);
    setNome(objeto.nome);
    setEmail(objeto.email);
    setTelefone(objeto.telefone);
    
    if (objeto.cpf || objeto.CPF) {
      setCpf(objeto.cpf || objeto.CPF || '');
    }

    // 🎯 Mantendo sua funcionalidade de subir a página suavemente ao editar
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
      await api.delete(`/clientes/${idParaDeletar}`);
      toast.success('Cliente removido com sucesso!', { className: 'alerta-sucesso' });
      buscarClientes();
      if (idEdicao === idParaDeletar) {
        setIdEdicao(null);
        setNome(''); setEmail(''); setTelefone(''); setCpf('');
      }
    } catch (error) {
      const msgBack = error.response?.data?.message || (typeof error.response?.data === 'string' ? error.response.data : null) || 'Não foi possível deletar o cliente.';
      toast.error(msgBack, { className: 'alerta-erro' });
    }
  };

  return (
    <div className="modulo-container">
      <h2>Módulo de Clientes</h2>

      <form onSubmit={salvarCliente} className="formulario-nexus">
        <h3>{idEdicao ? 'Atualizar Cliente' : 'Cadastrar Novo Cliente'}</h3>
        
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
            <label>CPF:</label>
            <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} required />
          </div>
        </div>

        <div className="botoes-form">
          <button type="submit" className="btn-nexus">
            {idEdicao ? 'Atualizar Registro' : 'Salvar Registro'}
          </button>
          {idEdicao && (
            <button type="button" className="btn-cancelar" onClick={() => {
              setIdEdicao(null);
              setNome(''); setEmail(''); setTelefone(''); setCpf('');
            }}>Cancelar Edição</button>
          )}
        </div>
      </form>

      <div className="tabela-secao">
        <h3>Lista de Clientes Cadastrados</h3>
        {clientes.length === 0 ? (
          <p className="vazio">Nenhum registro encontrado no sistema.</p>
        ) : (
          <table className="tabela-nexus">
            <thead>
              <tr>
                <th className="coluna-acoes">Ações</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id || c.cpf || c.CPF}>
                  <td className="coluna-acoes">
                    <div className="wrapper-botoes">
                      <button className="btn-acao btn-editar" onClick={() => prepararEdicao(c)} title="Editar">✏️</button>
                      <button className="btn-acao btn-deletar" onClick={() => abrirConfirmacaoDelecao(c.id)} title="Deletar">🗑️</button>
                    </div>
                  </td>
                  <td>{c.nome}</td>
                  <td>{c.email}</td>
                  <td>{c.telefone}</td>
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
            <h3>Excluir?</h3>
            <p>Tem certeza que deseja deletar este cliente? Esta ação não poderá ser desfeita.</p>
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