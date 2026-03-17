import { Categoria } from "./Categoria";
import { Pessoa } from "./Pessoa";

// Enum de tipo da transação (espelho do back-end)
export enum Tipo {
  Despesas = 0,
  Receitas = 1,
}

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: Tipo;
  categoria: Categoria;
  pessoa: Pessoa;
}

export interface CriarTransacaoDto {
  descricao: string;
  valor: number;
  tipo: Tipo;
  categoriaId: string;
  pessoaId: string;
}