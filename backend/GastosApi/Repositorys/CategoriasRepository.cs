using GastosApi.Data;
using GastosApi.Model;
using GastosApi.Repositorys.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GastosApi.Repositorys;

public class CategoriasRepository : ICategoriasRepository
{
    //Buscando a classe responsavel por manipular o banco
    private readonly AppDbContext _context;

    //Injetando o contexto do banco para poder manipular ele nessa classe
    public CategoriasRepository(AppDbContext context)
    {
        _context = context;
    }

    // Retorna todas as categorias cadastradas
    public async Task<IEnumerable<Categorias>> GetAllAsync()
        => await _context.Categorias.ToListAsync();

    // Adiciona uma nova categoria no banco
    public async Task<Categorias> CreateAsync(Categorias categoria)
    {
        await _context.Categorias.AddAsync(categoria);
        await _context.SaveChangesAsync();
        return categoria;
    }
}