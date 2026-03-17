using GastosApi.DTOs.Pessoas;
using GastosApi.Model;
using GastosApi.Repositorys.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GastosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly IPessoasRepository _repository;

    public PessoasController(IPessoasRepository repository)
    {
        _repository = repository;
    }

    // GET api/pessoas - Lista todas as pessoas
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var pessoas = await _repository.GetAllAsync();

        // Mapeia cada pessoa para o DTO de resposta
        var resposta = pessoas.Select(p => new PessoaRespostaDto
        {
            Id = p.Id,
            Nome = p.Nome,
            Idade = p.Idade
        });

        return Ok(resposta);
    }

    // POST api/pessoas - Cria uma nova pessoa
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CriarPessoaDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Mapeia o DTO para o model
        var pessoa = new Pessoas
        {
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        var criada = await _repository.CreateAsync(pessoa);

        var resposta = new PessoaRespostaDto
        {
            Id = criada.Id,
            Nome = criada.Nome,
            Idade = criada.Idade
        };

        return CreatedAtAction(nameof(GetAll), new { id = resposta.Id }, resposta);
    }

    // PUT api/pessoas/{id} - Atualiza uma pessoa existente
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CriarPessoaDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Mapeia o DTO para o model
        var pessoa = new Pessoas
        {
            Nome = dto.Nome,
            Idade = dto.Idade
        };

        var atualizada = await _repository.UpdateAsync(id, pessoa);
        if (atualizada is null)
            return NotFound("Pessoa não encontrada.");

        var resposta = new PessoaRespostaDto
        {
            Id = atualizada.Id,
            Nome = atualizada.Nome,
            Idade = atualizada.Idade
        };

        return Ok(resposta);
    }

    // DELETE api/pessoas/{id} - Deleta uma pessoa e todas as suas transações
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deletado = await _repository.DeleteAsync(id);
        if (!deletado)
            return NotFound("Pessoa não encontrada.");

        return NoContent();
    }
}