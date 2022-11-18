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
        private readonly int additionalMinutes = 15;
        private readonly ILogger<ScopedProcessingService> _logger;
        private readonly ApplicationContext _dbContext;

        public ScopedProcessingService(ILogger<ScopedProcessingService> logger, ApplicationContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        public async Task DoWork(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Started background service \"StatusDateUpdater\"");
            await Task.Delay(TimeSpan.FromSeconds(GetSecondsUntilMidnight()), stoppingToken);
            _logger.LogInformation("Background service \"StatusDateUpdater\" is working");
            while (!stoppingToken.IsCancellationRequested)
            {
                ChangeStatus();
                _logger.LogInformation("The statuses of the current date have been updated");
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }

            _logger.LogCritical("Backgroud service has been stopped!");
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
