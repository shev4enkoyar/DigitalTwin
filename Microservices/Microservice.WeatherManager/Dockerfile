#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Update apt packages
RUN apt update
RUN apt upgrade -y

RUN apt install git -y
RUN git clone https://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@github.com/shev4enkoyar/agrodigitaltwinCerts.git

RUN mkdir -p /https
RUN cp /app/agrodigitaltwinCerts/localhost.crt /usr/local/share/ca-certificates/
RUN cp /app/agrodigitaltwinCerts/localhost.pfx /https/
RUN update-ca-certificates


FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /src
COPY ["Microservices/Microservice.WeatherManager/Microservice.WeatherManager.csproj", "Microservices/Microservice.WeatherManager/"]
RUN dotnet restore "Microservices/Microservice.WeatherManager/Microservice.WeatherManager.csproj"
COPY . .
WORKDIR "/src/Microservices/Microservice.WeatherManager"
RUN dotnet build "Microservice.WeatherManager.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Microservice.WeatherManager.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Microservice.WeatherManager.dll"]