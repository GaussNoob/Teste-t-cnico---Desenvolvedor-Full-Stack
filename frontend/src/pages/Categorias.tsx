import { useCallback, useEffect, useState } from "react";
import { Categoria, CriarCategoriaDto, Finalidade } from "../types";
import { getCategorias, criarCategoria } from "../services/categoriasService";
import { getErrorMessage } from "../utils/error";

export default function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<Finalidade>(Finalidade.Ambas);
  const [erro, setErro] = useState("");

  const limparFormulario = useCallback(() => {
    setDescricao("");
    setFinalidade(Finalidade.Ambas);
  }, []);

  const carregarCategorias = useCallback(async () => {
    const data = await getCategorias();
    setCategorias(data);
  }, []);

  const handleSubmit = async () => {
    setErro("");
    if (!descricao.trim()) {
      setErro("A descricao da categoria e obrigatoria.");
      return;
    }

    const dto: CriarCategoriaDto = { descricao, finalidade };
    try {
      await criarCategoria(dto);
      limparFormulario();
      await carregarCategorias();
    } catch (e: unknown) {
      setErro(getErrorMessage(e, "Erro ao criar categoria"));
    }
  };

  useEffect(() => {
    let ativo = true;
    const carregarInicial = async () => {
      try {
        const data = await getCategorias();
        if (ativo) {
          setCategorias(data);
        }
      } catch (e: unknown) {
        if (ativo) {
          setErro(getErrorMessage(e, "Erro ao carregar categorias"));
        }
      }
    };

    void carregarInicial();
    return () => {
      ativo = false;
    };
  }, []);

  // Converte o enum para texto legível
  function finalidadeTexto(f: Finalidade) {
    if (f === Finalidade.Despesas) return "Despesas";
    if (f === Finalidade.Receitas) return "Receitas";
    return "Ambas";
  }

  return (
    <div>
      <h1>Categorias</h1>

      <div className="form-card">
        <h2>Nova Categoria</h2>
        {erro && <p className="error-message">{erro}</p>}
        <input
          placeholder="Descrição"
          maxLength={400}
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          className="field"
        />
        <select
          value={finalidade}
          onChange={e => setFinalidade(Number(e.target.value))}
          className="field"
        >
          <option value={Finalidade.Ambas}>Ambas</option>
          <option value={Finalidade.Despesas}>Despesas</option>
          <option value={Finalidade.Receitas}>Receitas</option>
        </select>
        <button onClick={handleSubmit} className="btn-primary">Cadastrar</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Finalidade</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c.id}>
              <td>{c.descricao}</td>
              <td>{finalidadeTexto(c.finalidade)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
