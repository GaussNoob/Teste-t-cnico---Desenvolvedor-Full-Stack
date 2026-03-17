using System.ComponentModel.DataAnnotations;
using GastosApi.Enuns;

namespace GastosApi.DTOs.Categorias;

// DTO para criação de categoria
public class CriarCategoriaDto
{
    [MaxLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
    public string? Descricao { get; set; }

    public Finalidade Finalidade { get; set; }
}