#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Microservices/Microservice.DashboardManager/Microservice.DashboardManager.csproj", "Microservices/Microservice.DashboardManager/"]
RUN dotnet restore "Microservices/Microservice.DashboardManager/Microservice.DashboardManager.csproj"
COPY . .
WORKDIR "/src/Microservices/Microservice.DashboardManager"
RUN dotnet build "Microservice.DashboardManager.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Microservice.DashboardManager.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY ["/etc/ssl/private/agrodigitaltwin/localhost.pfx", "/https/servercert.pfx"]
COPY ["/etc/ssl/private/agrodigitaltwin/localhost.crt", "/usr/local/share/ca-certificates/cacert.crt"]
RUN update-ca-certificates
ENTRYPOINT ["dotnet", "Microservice.DashboardManager.dll"]