namespace GastosApi.DTOs.Pessoas;

// DTO de resposta, evita expor a coleção de transações diretamente
public class PessoaRespostaDto
{
    public Guid Id { get; set; }
    public string? Nome { get; set; }
    public int Idade { get; set; }
}