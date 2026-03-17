// Enum de finalidade da categoria (espelho do back-end)
export enum Finalidade {
  Despesas = 0,
  Receitas = 1,
  Ambas = 2,
}

// Enum de tipo da transação (espelho do back-end)
export enum Tipo {
  Despesas = 0,
  Receitas = 1,
}

// Tipagem de pessoa retornada pela API
export interface Pessoa {
  id: string;
  nome: string;
  idade: number;
}

// Tipagem para criação/edição de pessoa
export interface CriarPessoaDto {
  nome: string;
  idade: number;
}

// Tipagem de categoria retornada pela API
export interface Categoria {
  id: string;
  descricao: string;
  finalidade: Finalidade;
}

// Tipagem para criação de categoria
export interface CriarCategoriaDto {
  descricao: string;
  finalidade: Finalidade;
}

// Tipagem de transação retornada pela API
export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: Tipo;
  categoria: Categoria;
  pessoa: Pessoa;
}

// Tipagem para criação de transação
export interface CriarTransacaoDto {
  descricao: string;
  valor: number;
  tipo: Tipo;
  categoriaId: string;
  pessoaId: string;
}

// Tipagem dos totais por pessoa
export interface TotalPorPessoa {
  id: string;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

// Tipagem da resposta de totais
export interface RespostaTotais {
  totais: TotalPorPessoa[];
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
  };
}