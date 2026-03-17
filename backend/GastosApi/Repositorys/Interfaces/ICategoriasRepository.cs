using GastosApi.Model;
namespace GastosApi.Repositorys.Interfaces;

public interface ICategoriasRepository
{
    // Retorna todas as categorias cadastradas
    Task<IEnumerable<Categorias>> GetAllAsync();
    
    // Cria uma nova categoria
    Task<Categorias> CreateAsync(Categorias categoria);
}