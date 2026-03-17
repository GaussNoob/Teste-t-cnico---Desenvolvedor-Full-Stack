export interface Pessoa {
  id: string;
  nome: string;
  idade: number;
}

export interface CriarPessoaDto {
  nome: string;
  idade: number;
}