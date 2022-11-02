#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Update apt packages
RUN apt update
RUN apt upgrade -y

RUN apt install python3.7 -y
# Add 3.7 to the available alternatives
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1

# Set python3.7 as the default python
RUN update-alternatives --set python /usr/bin/python3.7

RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
RUN apt install python3-distutils -y
RUN python get-pip.py
RUN rm get-pip.py
RUN pip install rosreestr2coord
RUN apt install ffmpeg libsm6 libxext6  -y

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
