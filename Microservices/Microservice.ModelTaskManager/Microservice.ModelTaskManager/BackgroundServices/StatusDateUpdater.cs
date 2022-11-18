using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using Task = System.Threading.Tasks.Task;

namespace Microservice.ModelTaskManager.BackgroundServices
{
    public class StatusDateUpdater : BackgroundService
    {
        public IServiceProvider Services { get; }

        public StatusDateUpdater(IServiceProvider services)
        {
            Services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await ChangeStatus(stoppingToken);
        }

        private async Task ChangeStatus(CancellationToken stoppingToken)
        {
            using var scope = Services.CreateScope();
            var scopedProcessingService = scope.ServiceProvider.GetRequiredService<IScopedProcessingService>();

            await scopedProcessingService.DoWork(stoppingToken);
        }


    }
}
