// Enum de finalidade da categoria (espelho do back-end)
export enum Finalidade {
  Despesas = 0,
  Receitas = 1,
  Ambas = 2,
}

export interface Categoria {
  // Identificador único da categoria.
  id: string;
  // Texto exibido para a categoria.
  descricao: string;
  // Define para que tipo de transação a categoria é permitida.
  finalidade: Finalidade;
}

export interface CriarCategoriaDto {
  // Dados mínimos enviados na criação de categoria.
  descricao: string;
  finalidade: Finalidade;
}
