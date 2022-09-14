using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace WebGateway
{
    public class Startup
    {
        //TODO @Arkirka Глянуть про SignalR
        public void ConfigureServices(IServiceCollection services)
        {
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
                endpoints.MapGrpcService<GreeterService>().EnableGrpcWeb().RequireCors("AllowAll");

                //TODO Убрать endpoint за ненадобностью
                /*endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Test WebManager page");
                });*/
            });
        }
    }
}
