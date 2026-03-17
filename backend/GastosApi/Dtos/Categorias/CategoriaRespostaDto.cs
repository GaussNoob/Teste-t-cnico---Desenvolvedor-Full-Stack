using GastosApi.Enuns;

namespace GastosApi.DTOs.Categorias;

// DTO de resposta da categoria
public class CategoriaRespostaDto
{
    public Guid Id { get; set; }
    public string? Descricao { get; set; }
    public Finalidade Finalidade { get; set; }
}