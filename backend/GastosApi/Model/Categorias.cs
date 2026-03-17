using System.ComponentModel.DataAnnotations;
using GastosApi.Enuns;

namespace GastosApi.Model;

public class Categorias
{
    // identificador (deve ser um valor único gerado automaticamente);
    // Descrição (texto com tamanho máximo de 400);
    // Finalidade (despesa/receita/ambas)
    
    
    // Identificador unico gerado automaticamente
    public Guid Id { get; set; } =  Guid.NewGuid();
    
    //Descricao, com maximo de caracteres 
    [MaxLength(400, ErrorMessage = "A descrição deve ter o tamanho maximo de 400")]
    public string Descricao { get; set; }
    
    // Finalidade da categoria (despesa/receita/ambas)
    public Finalidade Finalidade { get; set; }
}