using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using Task = System.Threading.Tasks.Task;

namespace Microservice.ModelTaskManager.BackgroundServices
{
    /// <summary>
    /// Background service for updating task execution statuses
    /// </summary>
    public class StatusDateUpdater : BackgroundService
    {
        /// <summary>
        /// Background task service
        /// </summary>
        public IServiceProvider Services { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public StatusDateUpdater(IServiceProvider services)
        {
            Services = services;
        }

        /// <summary>
        /// Background task execution method
        /// </summary>
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
