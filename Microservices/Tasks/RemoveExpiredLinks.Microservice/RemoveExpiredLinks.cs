using Grpc.Net.Client;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace RemoveExpiredLinks.Microservice
{
    public class RemoveExpiredLinks : BackgroundService
    {
        private readonly ILogger _logger;
        private readonly TimeSpan _interval = TimeSpan.FromMinutes(10);

        public RemoveExpiredLinks(ILogger<RemoveExpiredLinks> logger)
        {
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation($"Start ClearExpiredLinks. {DateTime.UtcNow}");

            while (!stoppingToken.IsCancellationRequested)
            {
                using var channel = GrpcChannel.ForAddress("https://localhost:5010");
                var client = new DbManager.Microservice.DbManager.DbManagerClient(channel);
                var reply = client.RemoveExpiredLinks(new DbManager.Microservice.RemoveRequest());
                if (!reply.Complete)
                    break;

                await Task.Delay(_interval, stoppingToken);
            }

            _logger.LogWarning($"Stop ClearExpiredLinks! {DateTime.UtcNow}");
        }
    }
}
