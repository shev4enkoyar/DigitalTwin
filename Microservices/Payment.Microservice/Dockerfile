#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Microservices/Payment.Microservice/Payment.Microservice.csproj", "Microservices/Payment.Microservice/"]
RUN dotnet restore "Microservices/Payment.Microservice/Payment.Microservice.csproj"
COPY . .
WORKDIR "/src/Microservices/Payment.Microservice"
RUN dotnet build "Payment.Microservice.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Payment.Microservice.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Payment.Microservice.dll"]