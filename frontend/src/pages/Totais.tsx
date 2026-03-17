import { useCallback, useEffect, useState } from "react";
import { RespostaTotais } from "../types";
import { getTotaisPorPessoa } from "../services/transacoesService";
import { getErrorMessage } from "../utils/error";
import { formatCurrency } from "../utils/format";

export default function Totais() {
  const [dados, setDados] = useState<RespostaTotais | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const carregarTotais = useCallback(async () => {
    setErro("");
    setCarregando(true);
    try {
      const resposta = await getTotaisPorPessoa();
      setDados(resposta);
    } catch (e: unknown) {
      setErro(getErrorMessage(e, "Erro ao carregar totais."));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    void carregarTotais();
  }, [carregarTotais]);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="error-message">{erro}</p>;
  if (!dados) return <p>Sem dados para exibir.</p>;

  return (
    <div>
      <h1>Totais por Pessoa</h1>

      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Receitas</th>
            <th>Despesas</th>
            <th>Saldo</th>
          </tr>
        </thead>
        <tbody>
          {dados.totais.map(t => (
            <tr key={t.id}>
              <td>{t.nome}</td>
              <td className="value-income">{formatCurrency(t.totalReceitas)}</td>
              <td className="value-expense">{formatCurrency(t.totalDespesas)}</td>
              <td className={t.saldo >= 0 ? "value-income" : "value-expense"}>{formatCurrency(t.saldo)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Geral</td>
            <td className="value-income">{formatCurrency(dados.totalGeral.totalReceitas)}</td>
            <td className="value-expense">{formatCurrency(dados.totalGeral.totalDespesas)}</td>
            <td className={dados.totalGeral.saldoLiquido >= 0 ? "value-income" : "value-expense"}>
              {formatCurrency(dados.totalGeral.saldoLiquido)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
