#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Microservices/Microservice.MapManager/Microservice.MapManager.csproj", "Microservices/Microservice.MapManager/"]
RUN dotnet restore "Microservices/Microservice.MapManager/Microservice.MapManager.csproj"
COPY . .
WORKDIR "/src/Microservices/Microservice.MapManager"
RUN dotnet build "Microservice.MapManager.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Microservice.MapManager.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Microservice.MapManager.dll"]