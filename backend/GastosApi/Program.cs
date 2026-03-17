using GastosApi.Data;
using GastosApi.Repositorys;
using GastosApi.Repositorys.Interfaces;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddOpenApi();

//Pegando a conection string do banco e salvando em uma variavel
var chave = builder.Configuration.GetConnectionString("Conexao") ?? throw new InvalidOperationException("Connection string 'Conexao' não encontrada."); ;

// Registra os repositories para injeção de dependência
builder.Services.AddScoped<IPessoasRepository, PessoasRepository>();
builder.Services.AddScoped<ICategoriasRepository, CategoriasRepository>();
builder.Services.AddScoped<ITransacoesRepository, TransacoesRepository>();

builder.Services.AddDbContext<AppDbContext>(options =>
{
  //Inserindo a connection e configurando o sqlite no appdbcontext
  options.UseSqlite(chave);
});

//Adicionei essa variavel, para facilitar a configurações da porta, normalmente o react puro vem por padrao no localhost:3000
//porem estou utilizando o vite, ou seja o padrao e diferente
int porta = 5173;

//Configurei o cors para que o nosso backend consiga se comunicar com o front
builder.Services.AddCors(options =>
{
  //adicionando politica cors
  options.AddPolicy("Localhost", policy =>
  {
    //Permitindo que esse endereco
    policy.WithOrigins($"http://localhost:{porta}")
          .AllowAnyHeader()
          .AllowAnyMethod();
  });
});
var app = builder.Build();

//aplicar automaticamente as migrations do banco de dados quando a aplicação inicia
using (var scope = app.Services.CreateScope())
{
  var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
  db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();

  //No modo de desevolvimento, eu adicionei o scalar, para fazer um mapeamento de rotas da api, nao foi solicitado
  //porem quis adicionar
  app.MapScalarApiReference();
}

app.UseHttpsRedirection();

//Utilizando configurações criado do cors
app.UseCors("Localhost");

app.UseAuthorization();

app.MapControllers();
app.Run();
