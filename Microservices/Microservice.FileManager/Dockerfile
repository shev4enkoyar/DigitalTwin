#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Microservices/Microservice.FileManager/Microservice.FileManager.csproj", "Microservices/Microservice.FileManager/"]
RUN dotnet restore "Microservices/Microservice.FileManager/Microservice.FileManager.csproj"
COPY . .
WORKDIR "/src/Microservices/Microservice.FileManager"
RUN dotnet build "Microservice.FileManager.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Microservice.FileManager.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Microservice.FileManager.dll"]