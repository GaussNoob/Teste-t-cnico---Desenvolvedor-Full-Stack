import { CriarTransacaoDto, RespostaTotais, Transacao } from "../types";
import { API_BASE_URL } from "./api";

// Endpoint base do recurso de transações.
const BASE_URL = `${API_BASE_URL}/transacoes`;

// Busca todas as transações cadastradas
export async function getTransacoes(): Promise<Transacao[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Erro ao buscar transações.");
  return response.json();
}

// Cria uma nova transação
export async function criarTransacao(dto: CriarTransacaoDto): Promise<Transacao> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  // Captura a mensagem de erro do back-end (ex: categoria incompatível, menor de idade)
  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro);
  }

  return response.json();
}

// Busca os totais de receitas, despesas e saldo por pessoa
export async function getTotaisPorPessoa(): Promise<RespostaTotais> {
  const response = await fetch(`${BASE_URL}/totais`);
  // Mantém a mensagem vinda da API para facilitar debug/regra de negócio no front.
  if (!response.ok) {
    const erro = await response.text();
    throw new Error(erro || `Erro ao buscar totais (HTTP ${response.status}).`);
  }
  return response.json();
}
