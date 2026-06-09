using AgroSat.AlertEngine.Api.Entities;
using AgroSat.AlertEngine.Api.Services;
using AgroSat.AlertEngine.Api.Data;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new()
    {
        Title = "AgroSat AlertEngine API",
        Version = "v1",
        Description = "Servico de composicao de alertas agricolas (RF-IA parcial). " +
                      "Consumido pelo backend Java; TTS em Python."
    });
});

builder.Services.AddScoped<IAlertCompositionService, AlertCompositionService>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var isMySqlAvailable = true;

if (string.IsNullOrWhiteSpace(connectionString))
{
    Console.WriteLine("WARNING: DefaultConnection is not configured. Falling back to in-memory database.");
    isMySqlAvailable = false;
}
else
{
    try
    {
        using var connection = new MySqlConnection(connectionString);
        connection.Open();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"WARNING: Unable to connect to MySQL. Falling back to in-memory database. {ex.Message}");
        isMySqlAvailable = false;
    }
}

if (isMySqlAvailable)
{
    builder.Services.AddDbContext<AgroSatDbContext>(options =>
        options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 33))));
}
else
{
    builder.Services.AddDbContext<AgroSatDbContext>(options =>
        options.UseInMemoryDatabase("AgroSatDev"));
}

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AgroSatDbContext>();
    try
    {
        db.Database.EnsureCreated();

        if (!db.Terrenos.Any())
        {
            db.Terrenos.AddRange(new[]
            {
                new Terreno
                {
                    Nome = "Fazenda Central",
                    Descricao = "Terreno de teste importado pelo app mobile.",
                    Latitude = 40.712776m,
                    Longitude = -74.005974m,
                    AreaTotalHectares = 12.50m,
                    AreaReservaHectares = 1.20m,
                    AreaCultivoHectares = 10.00m,
                    EmCultivo = true,
                    CulturaAtual = "Soja",
                    TipoSolo = "Arenoso",
                    IrrigacaoAtiva = false,
                    DataReferencia = DateTime.UtcNow,
                    Observacoes = "Terreno inicial de desenvolvimento.",
                    CriadoEm = DateTime.UtcNow,
                    AtualizadoEm = DateTime.UtcNow
                }
            });
            db.SaveChanges();
        }
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Erro ao inicializar o banco de dados.");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();
