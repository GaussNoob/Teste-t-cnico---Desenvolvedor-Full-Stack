using GastosApi.Data;
using GastosApi.DTOs.Categorias;
using GastosApi.DTOs.Pessoas;
using GastosApi.DTOs.Transacoes;
using GastosApi.Enuns;
using GastosApi.Model;
using GastosApi.Repositorys.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GastosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly ITransacoesRepository _repository;
    private readonly AppDbContext _context;

    public TransacoesController(ITransacoesRepository repository, AppDbContext context)
    {
        _repository = repository;
        _context = context;
    }

    // GET api/transacoes - Lista todas as transações
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var transacoes = await _repository.GetAllAsync();

        // Mapeia cada transação para o DTO de resposta incluindo pessoa e categoria
        var resposta = transacoes.Select(t => new TransacaoRespostaDto
        {
            Id = t.Id,
            Descricao = t.Descricao,
            Valor = t.Valor,
            Tipo = t.Tipo,
            Pessoa = t.Pessoa is null ? null : new PessoaRespostaDto
            {
                Id = t.Pessoa.Id,
                Nome = t.Pessoa.Nome,
                Idade = t.Pessoa.Idade
            },
            Categoria = t.Categoria is null ? null : new CategoriaRespostaDto
            {
                Id = t.Categoria.Id,
                Descricao = t.Categoria.Descricao,
                Finalidade = t.Categoria.Finalidade
            }
        });

        return Ok(resposta);
    }

    // POST api/transacoes - Cria uma nova transação aplicando as regras de negócio
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CriarTransacaoDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Busca a pessoa para verificar a idade
        var pessoa = await _context.Pessoas.FindAsync(dto.PessoaId);
        if (pessoa is null)
            return NotFound("Pessoa não encontrada.");

        // Regra de negócio: menor de idade só pode registrar despesas
        if (pessoa.Idade < 18 && dto.Tipo == Tipo.receitas)
            return BadRequest("Menores de idade só podem registrar despesas.");

        // Busca a categoria para validar a finalidade
        var categoria = await _context.Categorias.FindAsync(dto.CategoriaId);
        if (categoria is null)
            return NotFound("Categoria não encontrada.");

        // Regra de negócio: categoria deve ser compatível com o tipo da transação
        bool categoriaValida = categoria.Finalidade == Finalidade.ambas
            || (dto.Tipo == Tipo.despesas && categoria.Finalidade == Finalidade.despesas)
            || (dto.Tipo == Tipo.receitas && categoria.Finalidade == Finalidade.receitas);

        if (!categoriaValida)
            return BadRequest("Categoria incompatível com o tipo da transação.");

        // Mapeia o DTO para o model
        var transacao = new Transacao
        {
            Descricao = dto.Descricao,
            Valor = dto.Valor,
            Tipo = dto.Tipo,
            CategoriaId = dto.CategoriaId,
            PessoaId = dto.PessoaId
        };

        var criada = await _repository.CreateAsync(transacao);

        var resposta = new TransacaoRespostaDto
        {
            Id = criada.Id,
            Descricao = criada.Descricao,
            Valor = criada.Valor,
            Tipo = criada.Tipo,
            Pessoa = new PessoaRespostaDto
            {
                Id = pessoa.Id,
                Nome = pessoa.Nome,
                Idade = pessoa.Idade
            },
            Categoria = new CategoriaRespostaDto
            {
                Id = categoria.Id,
                Descricao = categoria.Descricao,
                Finalidade = categoria.Finalidade
            }
        };

        return CreatedAtAction(nameof(GetAll), new { id = resposta.Id }, resposta);
    }

    // GET api/transacoes/totais - Retorna totais de receitas, despesas e saldo por pessoa
    [HttpGet("totais")]
    public async Task<IActionResult> GetTotaisPorPessoa()
    {
        var totais = await _context.Pessoas
            .Select(p => new
            {
                p.Id,
                p.Nome,
                TotalReceitas = p.Transacoes
                    .Where(t => t.Tipo == Tipo.receitas)
                    .Sum(t => t.Valor),
                TotalDespesas = p.Transacoes
                    .Where(t => t.Tipo == Tipo.despesas)
                    .Sum(t => t.Valor),
                Saldo = p.Transacoes.Where(t => t.Tipo == Tipo.receitas).Sum(t => t.Valor)
                      - p.Transacoes.Where(t => t.Tipo == Tipo.despesas).Sum(t => t.Valor)
            })
            .ToListAsync();

        // Calcula o total geral somando todas as pessoas
        var totalGeral = new
        {
            TotalReceitas = totais.Sum(t => t.TotalReceitas),
            TotalDespesas = totais.Sum(t => t.TotalDespesas),
            SaldoLiquido = totais.Sum(t => t.Saldo)
        };

        return Ok(new { totais, totalGeral });
    }
}