using GastosApi.Model;
using Microsoft.EntityFrameworkCore;

namespace GastosApi.Data;

// Contexto do banco de dados, herda dbContext do entity framework
public class AppDbContext : DbContext
{   
    // Construtor que passa as configurações para a classe base 
    public AppDbContext(DbContextOptions options) : base(options)
    {
        
    }
    
    // Tabela de categorias
    public DbSet<Categorias>  Categorias { get; set; }
    // Tabela de pessoas
    public DbSet<Pessoas>  Pessoas { get; set; }
    // Tabela de transações
    public DbSet<Transacao>  Transacao { get; set; }
    
}