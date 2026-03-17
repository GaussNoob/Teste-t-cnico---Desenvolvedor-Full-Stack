using GastosApi.DTOs.Categorias;
using GastosApi.Model;
using GastosApi.Repositorys.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GastosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
    private readonly ICategoriasRepository _repository;

    public CategoriasController(ICategoriasRepository repository)
    {
        _repository = repository;
    }

    // GET api/categorias - Lista todas as categorias
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var categorias = await _repository.GetAllAsync();

        // Mapeia cada categoria para o DTO de resposta
        var resposta = categorias.Select(c => new CategoriaRespostaDto
        {
            Id = c.Id,
            Descricao = c.Descricao,
            Finalidade = c.Finalidade
        });

        return Ok(resposta);
    }

    // POST api/categorias - Cria uma nova categoria
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CriarCategoriaDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Mapeia o DTO para o model
        var categoria = new Categorias
        {
            Descricao = dto.Descricao,
            Finalidade = dto.Finalidade
        };

        var criada = await _repository.CreateAsync(categoria);

        // Mapeia o model para o DTO de resposta
        var resposta = new CategoriaRespostaDto
        {
            Id = criada.Id,
            Descricao = criada.Descricao,
            Finalidade = criada.Finalidade
        };

        return CreatedAtAction(nameof(GetAll), new { id = resposta.Id }, resposta);
    }
}