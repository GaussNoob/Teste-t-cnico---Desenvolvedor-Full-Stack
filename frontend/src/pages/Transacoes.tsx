import { useCallback, useEffect, useMemo, useState } from "react";
import { Transacao, CriarTransacaoDto, Tipo, Finalidade, Pessoa, Categoria } from "../types";
import { getTransacoes, criarTransacao } from "../services/transacoesService";
import { getPessoas } from "../services/pessoasService";
import { getCategorias } from "../services/categoriasService";
import { getErrorMessage } from "../utils/error";
import { formatCurrency } from "../utils/format";

export default function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [tipo, setTipo] = useState<Tipo>(Tipo.Despesas);
  const [pessoaId, setPessoaId] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [erro, setErro] = useState("");

  const limparFormulario = useCallback(() => {
    setDescricao("");
    setValor(0);
    setPessoaId("");
    setCategoriaId("");
    setTipo(Tipo.Despesas);
  }, []);

  const carregarDados = useCallback(async () => {
    const [t, p, c] = await Promise.all([getTransacoes(), getPessoas(), getCategorias()]);
    setTransacoes(t);
    setPessoas(p);
    setCategorias(c);
  }, []);

  // Filtra categorias compatíveis com o tipo selecionado
  const categoriasFiltradasPorTipo = useMemo(
    () =>
      categorias.filter(c =>
        c.finalidade === Finalidade.Ambas ||
        (tipo === Tipo.Despesas && c.finalidade === Finalidade.Despesas) ||
        (tipo === Tipo.Receitas && c.finalidade === Finalidade.Receitas)
      ),
    [categorias, tipo]
  );

  const handleSubmit = async () => {
    setErro("");
    if (!descricao.trim() || valor <= 0 || !pessoaId || !categoriaId) {
      setErro("Preencha descrição, valor, pessoa e categoria.");
      return;
    }

    const dto: CriarTransacaoDto = { descricao, valor, tipo, pessoaId, categoriaId };
    try {
      await criarTransacao(dto);
      limparFormulario();
      await carregarDados();
    } catch (e: unknown) {
      setErro(getErrorMessage(e, "Erro ao criar transacao"));
    }
  };

  useEffect(() => {
    let ativo = true;
    const carregarInicial = async () => {
      try {
        const [t, p, c] = await Promise.all([getTransacoes(), getPessoas(), getCategorias()]);
        if (ativo) {
          setTransacoes(t);
          setPessoas(p);
          setCategorias(c);
        }
      } catch (e: unknown) {
        if (ativo) {
          setErro(getErrorMessage(e, "Erro ao carregar dados de transacoes"));
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
      <h1>Transações</h1>

      <div className="form-card">
        <h2>Nova Transação</h2>
        {erro && <p className="error-message">{erro}</p>}
        <input
          placeholder="Descrição"
          maxLength={400}
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          className="field"
        />
        <input
          type="number"
          placeholder="Valor"
          min={0.01}
          value={valor}
          onChange={e => setValor(Number(e.target.value))}
          className="field"
        />
        <select value={tipo} onChange={e => { setTipo(Number(e.target.value)); setCategoriaId(""); }} className="field">
          <option value={Tipo.Despesas}>Despesa</option>
          <option value={Tipo.Receitas}>Receita</option>
        </select>
        <select value={pessoaId} onChange={e => setPessoaId(e.target.value)} className="field">
          <option value="">Selecione a pessoa</option>
          {pessoas.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <select value={categoriaId} onChange={e => setCategoriaId(e.target.value)} className="field">
          <option value="">Selecione a categoria</option>
          {categoriasFiltradasPorTipo.map(c => (
            <option key={c.id} value={c.id}>{c.descricao}</option>
          ))}
        </select>
        <button onClick={handleSubmit} className="btn-primary">Cadastrar</button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Categoria</th>
            <th>Pessoa</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map(t => (
            <tr key={t.id}>
              <td>{t.descricao}</td>
              <td>{formatCurrency(t.valor)}</td>
              <td>{t.tipo === Tipo.Despesas ? "Despesa" : "Receita"}</td>
              <td>{t.categoria?.descricao}</td>
              <td>{t.pessoa?.nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
