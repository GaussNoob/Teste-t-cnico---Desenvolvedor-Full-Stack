using GastosApi.Model;

namespace GastosApi.Repositorys.Interfaces;

public interface IPessoasRepository
{
    // Retorna todas as pessoas cadastradas
    Task<IEnumerable<Pessoas>> GetAllAsync();
    
    // Retorna uma pessoa pelo id
    Task<Pessoas?> GetByIdAsync(Guid id);
    
    // Cria uma nova pessoa
    Task<Pessoas> CreateAsync(Pessoas pessoa);
    
    // Atualiza uma pessoa existente
    Task<Pessoas?> UpdateAsync(Guid id, Pessoas pessoa);
    
    // Deleta uma pessoa e todas as suas transações
    Task<bool> DeleteAsync(Guid id);
}