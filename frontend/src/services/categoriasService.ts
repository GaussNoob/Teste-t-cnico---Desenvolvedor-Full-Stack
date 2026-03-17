import { Categoria, CriarCategoriaDto } from "../types";
import { API_BASE_URL } from "./api";

// Endpoint base do recurso de categorias.
const BASE_URL = `${API_BASE_URL}/categorias`;

// Busca todas as categorias cadastradas
export async function getCategorias(): Promise<Categoria[]> {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Erro ao buscar categorias.");
  return response.json();
}

// Cria uma nova categoria
export async function criarCategoria(dto: CriarCategoriaDto): Promise<Categoria> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });
  if (!response.ok) throw new Error("Erro ao criar categoria.");
  return response.json();
}
