using System.ComponentModel.DataAnnotations;

namespace GastosApi.Model;

public class Pessoas
{
    //Identificador (deve ser um valor único gerado automaticamente);
    // Nome (texto com tamanho máximo de 200);
    // Idade;
    
    //Identificador Unico gerado automaticamente
    public Guid Id { get; set; } = Guid.NewGuid();
    
    //Nome com no maximo 200
    [MaxLength(200, ErrorMessage = "A mensagem deve ter no maximo 200 caracteres")]
    public string Nome { get; set; }
    
    //Coloquei idade com limite razoável de 0 a 150 anos mesmo nao sendo solicitado
    [Range(0, 150, ErrorMessage = "A idade deve estar entre 0 e 150 anos.")]
    public int Idade { get; set; }
    
    // Coleção de transações vinculadas à pessoa (necessário para exclusão em cascata)
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}