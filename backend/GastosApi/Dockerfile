FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY GastosApi.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app

RUN mkdir -p /data
COPY --from=build /app/publish ./

ENV ASPNETCORE_URLS=http://+:8080
ENV ConnectionStrings__Conexao=Data Source=/data/Banco.db;

EXPOSE 8080

ENTRYPOINT ["dotnet", "GastosApi.dll"]
