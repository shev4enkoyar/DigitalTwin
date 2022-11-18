using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using Task = System.Threading.Tasks.Task;

namespace Microservice.ModelTaskManager.BackgroundServices
{
    public class StatusDateUpdater : BackgroundService
    {
        public IServiceProvider Services { get; }
        private readonly ILogger<StatusDateUpdater> _logger;
        private readonly int additionalMinutes = 15;

        public StatusDateUpdater(Logger<StatusDateUpdater> logger, IServiceProvider services)
        {
            _logger = logger;
            Services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Started background service \"StatusDateUpdater\"");
            await Task.Delay(TimeSpan.FromSeconds(GetSecondsUntilMidnight()), stoppingToken);

            await ChangeStatus(stoppingToken);
        }

        private async Task ChangeStatus(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Background service \"StatusDateUpdater\" is working");

            using var scope = Services.CreateScope();
            var scopedProcessingService = scope.ServiceProvider.GetRequiredService<IScopedProcessingService>();

            await scopedProcessingService.DoWork(stoppingToken);
        }

        private int GetSecondsUntilMidnight()
        {
            DateTime now = DateTime.UtcNow;
            int hours = 23 - now.Hour;
            int minutes = 59 - now.Minute;
            int seconds = 59 - now.Second;
            int secondsTillMidnight = hours * 3600 + (minutes + additionalMinutes) * 60 + seconds;
            return secondsTillMidnight;
        }
    }
}
