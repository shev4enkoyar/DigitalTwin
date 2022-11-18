using Microservice.ModelTaskManager.DAL;
using Microservice.ModelTaskManager.DAL.Models;
using Microsoft.EntityFrameworkCore;
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
        private readonly IDbContextFactory<ApplicationContext> _contextFactory;
        private readonly ILogger<StatusDateUpdater> _logger;
        private readonly int additionalMinutes = 15;

        public StatusDateUpdater(ILogger<StatusDateUpdater> logger, IDbContextFactory<ApplicationContext> contextFactory)
        {
            _logger = logger;
            _contextFactory = contextFactory;
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
            using var context = _contextFactory.CreateDbContext();
            DateTime currDate = DateConverter(DateTime.UtcNow);
            IEnumerable<Detail> rowsForUpdate = context.Details
                .Where(x => x.Date.Equals(currDate) && x.Status.Equals("passive"))
                .ToList()
                .Select(x => { x.Status = "active"; return x; });

            context.Details.UpdateRange(rowsForUpdate);
            context.SaveChanges();

        }

        private DateTime DateConverter(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day);
        }
    }
}
