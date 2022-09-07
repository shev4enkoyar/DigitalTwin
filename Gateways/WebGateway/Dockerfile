#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Gateways/WebGateway/WebGateway.csproj", "Gateways/WebGateway/"]
RUN dotnet restore "Gateways/WebGateway/WebGateway.csproj"
COPY . .
WORKDIR "/src/Gateways/WebGateway"
RUN dotnet build "WebGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebGateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebGateway.dll"]