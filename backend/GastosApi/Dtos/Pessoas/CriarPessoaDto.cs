using System.ComponentModel.DataAnnotations;

namespace GastosApi.DTOs.Pessoas;

// DTO para criação e atualização de pessoa
public class CriarPessoaDto
{
    [MaxLength(200, ErrorMessage = "O nome deve ter no máximo 200 caracteres.")]
    public string? Nome { get; set; }

    [Range(0, 150, ErrorMessage = "A idade deve estar entre 0 e 150 anos.")]
    public int Idade { get; set; }
}