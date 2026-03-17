using System.ComponentModel.DataAnnotations;
using GastosApi.Enuns;

namespace GastosApi.DTOs.Transacoes;

// DTO para criação de transação
public class CriarTransacaoDto
{
    [MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
    public string? Descricao { get; set; }

    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser positivo.")]
    public decimal Valor { get; set; }

    // Tipo da transação (despesa/receita)
    public Tipo Tipo { get; set; }

    // Identificador da categoria escolhida
    public Guid CategoriaId { get; set; }

    // Identificador da pessoa vinculada
    public Guid PessoaId { get; set; }
}