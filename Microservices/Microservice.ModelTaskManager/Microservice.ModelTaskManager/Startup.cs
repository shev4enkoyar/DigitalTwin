using Microservice.ModelTaskManager.BackgroundServices;
using Microservice.ModelTaskManager.DAL;
using Microservice.TaskManager.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Microservice.ModelTaskManager
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
            services.AddHostedService<StatusDateUpdater>();
            services.AddScoped<IScopedProcessingService, ScopedProcessingService>();

            services.AddDbContext<ApplicationContext>(options =>
            {
                options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
            });

            services.AddGrpc();

        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGrpcService<TaskProtoService>();
            });
        }
    }
}
