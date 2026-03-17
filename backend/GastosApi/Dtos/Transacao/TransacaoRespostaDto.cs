using GastosApi.DTOs.Categorias;
using GastosApi.DTOs.Pessoas;
using GastosApi.Enuns;

namespace GastosApi.DTOs.Transacoes;

// DTO de resposta com dados de pessoa e categoria embutidos
public class TransacaoRespostaDto
{
    public Guid Id { get; set; }
    public string? Descricao { get; set; }
    public decimal Valor { get; set; }
    public Tipo Tipo { get; set; }
    public CategoriaRespostaDto? Categoria { get; set; }
    public PessoaRespostaDto? Pessoa { get; set; }
}