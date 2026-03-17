import { useCallback, useEffect, useState } from "react";
import { Pessoa, CriarPessoaDto } from "../types";
import { getPessoas, criarPessoa, atualizarPessoa, deletarPessoa } from "../services/pessoasService";
import { getErrorMessage } from "../utils/error";

export default function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [editando, setEditando] = useState<Pessoa | null>(null);
  const [erro, setErro] = useState("");

  const limparFormulario = useCallback(() => {
    setNome("");
    setIdade(0);
    setEditando(null);
  }, []);

  const carregarPessoas = useCallback(async () => {
    const data = await getPessoas();
    setPessoas(data);
  }, []);

  const handleSubmit = async () => {
    setErro("");
    if (!nome.trim() || idade < 0) {
      setErro("Informe um nome valido e uma idade maior ou igual a zero.");
      return;
    }

    const dto: CriarPessoaDto = { nome, idade };
    try {
      if (editando) {
        // Atualiza pessoa existente
        await atualizarPessoa(editando.id, dto);
      } else {
        // Cria nova pessoa
        await criarPessoa(dto);
      }
      limparFormulario();
      await carregarPessoas();
    } catch (e: unknown) {
      setErro(getErrorMessage(e, "Erro ao salvar pessoa"));
    }
  };

  const handleDeletar = async (id: string) => {
    if (!confirm("Deseja deletar esta pessoa e todas as suas transações?")) return;
    setErro("");
    try {
      await deletarPessoa(id);
      await carregarPessoas();
    } catch (e: unknown) {
      setErro(getErrorMessage(e, "Erro ao deletar pessoa"));
    }
  };

  function handleEditar(pessoa: Pessoa) {
    // Preenche o formulário com os dados da pessoa selecionada
    setEditando(pessoa);
    setNome(pessoa.nome);
    setIdade(pessoa.idade);
  }

  // Carrega as pessoas ao montar o componente
  useEffect(() => {
    let ativo = true;
    const carregarInicial = async () => {
      try {
        const data = await getPessoas();
        if (ativo) {
          setPessoas(data);
        }
      } catch (e: unknown) {
        if (ativo) {
          setErro(getErrorMessage(e, "Erro ao carregar pessoas"));
        }
      }
    };

    void carregarInicial();
    return () => {
      ativo = false;
    };
  }, []);

  return (
    <div>
      <h1>Pessoas</h1>

      <div className="form-card">
        <h2>{editando ? "Editar Pessoa" : "Nova Pessoa"}</h2>
        {erro && <p className="error-message">{erro}</p>}
        <input
          placeholder="Nome"
          maxLength={200}
          value={nome}
          onChange={e => setNome(e.target.value)}
          className="field"
        />
        <input
          type="number"
          placeholder="Idade"
          min={0}
          max={150}
          value={idade}
          onChange={e => setIdade(Number(e.target.value))}
          className="field"
        />
        <div className="button-row">
          <button onClick={handleSubmit} className="btn-primary">
            {editando ? "Salvar" : "Cadastrar"}
          </button>
          {editando && (
            <button onClick={limparFormulario} className="btn-secondary">
              Cancelar
            </button>
          )}
        </div>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.idade}</td>
              <td>
                <button onClick={() => handleEditar(p)} className="btn-small btn-edit">Editar</button>
                <button onClick={() => handleDeletar(p.id)} className="btn-small btn-danger">Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
