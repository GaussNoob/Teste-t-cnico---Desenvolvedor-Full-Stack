import { CriarPessoaDto, Pessoa } from "../types";
import { API_BASE_URL } from "./api";

// Endpoint base do recurso de pessoas.
const BASE_URL = `${API_BASE_URL}/pessoas`;

// Busca todas as pessoas cadastradas
export async function getPessoas(): Promise<Pessoa[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Erro ao buscar pessoas.");
  return response.json();
}

// Cria uma nova pessoa
export async function criarPessoa(dto: CriarPessoaDto): Promise<Pessoa> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Erro ao criar pessoa.");
  return response.json();
}

// Atualiza uma pessoa existente pelo id
export async function atualizarPessoa(id: string, dto: CriarPessoaDto): Promise<Pessoa> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Erro ao atualizar pessoa.");
  return response.json();
}

// Deleta uma pessoa pelo id
export async function deletarPessoa(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Erro ao deletar pessoa.");
}
