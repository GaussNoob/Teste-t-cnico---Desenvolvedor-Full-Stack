using GastosApi.Model;

namespace GastosApi.Repositorys.Interfaces;

public interface ITransacoesRepository
{
    // Retorna todas as transações cadastradas
    Task<IEnumerable<Transacao>> GetAllAsync();
    
    // Cria uma nova transação
    Task<Transacao> CreateAsync(Transacao transacao);
}