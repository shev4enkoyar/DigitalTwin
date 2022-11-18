using Microservice.ModelTaskManager.DAL;
using Microservice.ModelTaskManager.DAL.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Task = System.Threading.Tasks.Task;

namespace Microservice.ModelTaskManager.BackgroundServices
{
    internal interface IScopedProcessingService
    {
        Task DoWork(CancellationToken stoppingToken);
    }

    internal class ScopedProcessingService : IScopedProcessingService
    {
        private readonly ILogger _logger;
        private readonly ApplicationContext _dbContext;

        public ScopedProcessingService(ILogger<ScopedProcessingService> logger, ApplicationContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        public async Task DoWork(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                ChangeStatus();
                _logger.LogInformation("The statuses of the current date have been updated");
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }

            _logger.LogCritical("Backgroud service has been stopped!");
        }

        private void ChangeStatus()
        {
            DateTime currDate = DateConverter(DateTime.UtcNow);
            IEnumerable<Detail> rowsForUpdate = _dbContext.Details
                .Where(x => x.Date.Equals(currDate) && x.Status.Equals("passive"))
                .ToList()
                .Select(x => { x.Status = "active"; return x; });

            _dbContext.Details.UpdateRange(rowsForUpdate);
            _dbContext.SaveChanges();
        }

        private DateTime DateConverter(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day);
        }
    }
}
