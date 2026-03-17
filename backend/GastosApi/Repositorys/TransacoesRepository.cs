using GastosApi.Data;
using GastosApi.Model;
using GastosApi.Repositorys.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GastosApi.Repositorys;

public class TransacoesRepository: ITransacoesRepository
{
    //Buscando a classe responsavel por manipular o banco
    private readonly AppDbContext _context;
    
    //Injetando o contexto do banco para poder manipular ele nessa classe
    public TransacoesRepository(AppDbContext context)
    {
        _context = context;
    }
    
    // Retorna todas as transações incluindo os dados da pessoa e categoria
    public async Task<IEnumerable<Transacao>> GetAllAsync()
        => await _context.Transacao
            .Include(t => t.Pessoa)
            .Include(t => t.Categoria)
            .ToListAsync();

    // Adiciona uma nova transação no banco
    public async Task<Transacao> CreateAsync(Transacao transacao)
    {
        await _context.Transacao.AddAsync(transacao);
        await _context.SaveChangesAsync();
        return transacao;
    }
}