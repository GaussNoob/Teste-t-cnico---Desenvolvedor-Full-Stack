using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using GastosApi.Enuns;

namespace GastosApi.Model;

public class Transacao
{
    //Identificador (deve ser um valor único gerado automaticamente);
    // Descrição (texto com tamanho máximo de 400);
    // Valor (número positivo);
    // Tipo (despesa/receita);
    // Categoria: restringir a utilização de categorias conforme o valor definido no campo finalidade. Ex.: se o tipo da transação é despesa, não poderá utilizar uma categoria que tenha a finalidade receita.
    // Pessoa (identificador da pessoa do cadastro anterior);

    //Identificador unico gerado automaticamente
    public Guid Id { get; set; } = Guid.NewGuid();
    
    //Descrição com máximo de 400 caracteres
    [MaxLength(400, ErrorMessage = "O texto deve ter um tamanho maximo de 400 caracteres.")]
    public string Descricao { get; set; } 
    
    // Valor deve ser positivo 
    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser positivo.")]
    public decimal Valor { get; set; }
    
    // Tipo da transação (despesa/receita)
    public Tipo Tipo { get; set; }
    
    // Chave estrangeira da categoria
    public Guid CategoriaId { get; set; }
    
    // Navegação para a categoria
    [ForeignKey(nameof(CategoriaId))]
    public Categorias? Categoria { get; set; }
    
    // Chave estrangeira da categoria
    Categorias Categorias { get; set; }
    
    
    // Chave estrangeira da pessoa
    public Guid PessoaId { get; set; }
    
    // Navegação para a pessoa
    [ForeignKey(nameof(PessoaId))]
    public Pessoas? Pessoa { get; set; }
    
}