using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Microservice.DashboardManager.BackgroundServices
{
    public class ProductPriceUpdater : BackgroundService
    {
        /// <summary>
        /// Background task service
        /// </summary>
        public IServiceProvider Services { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public ProductPriceUpdater(IServiceProvider services)
        {
            Services = services;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await UpdatePrices(stoppingToken);
        }

        private async Task UpdatePrices(CancellationToken stoppingToken)
        {
            using var scope = Services.CreateScope();
            var scopedProcessingService = scope.ServiceProvider.GetRequiredService<IProductPriceUpdaterScopedService>();

            await scopedProcessingService.UpdatePrices(stoppingToken);
        }
    }
}
