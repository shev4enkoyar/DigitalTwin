using Microservice.MapManager.DAL;
using Microservice.MapManager.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Microservice.MapManager
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
     
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationContext>(options =>
            {
                options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddGrpc();

            services.AddSignalR();

            services.AddCors(o => o.AddPolicy("AllowAll", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
            }));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseGrpcWeb();
            app.UseCors(x => x
               .AllowAnyMethod()
               .AllowAnyHeader()
               .SetIsOriginAllowed(origin => true)
               .AllowCredentials()
           );

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<MapHub>("/hubs/dashboard/map");
                endpoints.MapGrpcService<FigureProtoService>().EnableGrpcWeb().RequireCors("AllowAll");
                endpoints.MapGrpcService<FigureCategoryProtoService>().EnableGrpcWeb().RequireCors("AllowAll");
                endpoints.MapGrpcService<MapProtoService>().EnableGrpcWeb().RequireCors("AllowAll");
            });
        }
    }
}
