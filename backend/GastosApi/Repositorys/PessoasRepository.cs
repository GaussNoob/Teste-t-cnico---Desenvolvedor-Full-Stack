using GastosApi.Data;
using GastosApi.Model;
using GastosApi.Repositorys.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GastosApi.Repositorys;

public class PessoasRepository : IPessoasRepository
{
    //Buscando a classe responsavel por manipular o banco
    private readonly AppDbContext _context;

    //Injetando o contexto do banco para poder manipular ele nessa classe
    public PessoasRepository(AppDbContext context)
    {
        _context = context;
    }

    // Retorna todas as pessoas cadastradas
    public async Task<IEnumerable<Pessoas>> GetAllAsync()
        => await _context.Pessoas.ToListAsync();

    // Retorna uma pessoa pelo id
    public async Task<Pessoas?> GetByIdAsync(Guid id)
        => await _context.Pessoas.FindAsync(id);

    // Adiciona uma nova pessoa no banco
    public async Task<Pessoas> CreateAsync(Pessoas pessoa)
    {
        await _context.Pessoas.AddAsync(pessoa);
        await _context.SaveChangesAsync();
        return pessoa;
    }

    // Atualiza nome e idade de uma pessoa existente
    public async Task<Pessoas?> UpdateAsync(Guid id, Pessoas pessoaAtualizada)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa is null) return null;

        pessoa.Nome = pessoaAtualizada.Nome;
        pessoa.Idade = pessoaAtualizada.Idade;

        await _context.SaveChangesAsync();
        return pessoa;
    }

    // Deleta uma pessoa e todas as suas transações (cascata)
    public async Task<bool> DeleteAsync(Guid id)
    {
        var pessoa = await _context.Pessoas
            .Include(p => p.Transacoes)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pessoa is null) return false;

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
        return true;
    }
}