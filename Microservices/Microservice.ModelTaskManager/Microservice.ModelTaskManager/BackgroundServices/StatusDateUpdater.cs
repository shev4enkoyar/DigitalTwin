using Microservice.ModelTaskManager.DAL;
using Microservice.ModelTaskManager.DAL.Models;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using Task = System.Threading.Tasks.Task;

namespace Microservice.ModelTaskManager.BackgroundServices
{
    public class StatusDateUpdater : BackgroundService
    {
        private ApplicationContext DbContext { get; }
        private readonly ILogger<StatusDateUpdater> _logger;
        private readonly int additionalMinutes = 15;

        public StatusDateUpdater(ApplicationContext dbContext, ILogger<StatusDateUpdater> logger)
        {
            DbContext = dbContext;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Started background service \"StatusDateUpdater\"");
            await Task.Delay(TimeSpan.FromSeconds(GetSecondsUntilMidnight()), stoppingToken);

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
            IEnumerable<Detail> rowsForUpdate = DbContext.Details
                .Where(x => x.Date.Equals(currDate) && x.Status.Equals("passive"))
                .ToList()
                .Select(x => { x.Status = "active"; return x; });

            DbContext.Details.UpdateRange(rowsForUpdate);
            DbContext.SaveChanges();
        }

        private DateTime DateConverter(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day);
        }
    }
}
