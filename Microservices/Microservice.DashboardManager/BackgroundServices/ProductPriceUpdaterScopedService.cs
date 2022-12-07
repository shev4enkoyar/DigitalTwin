using Microservice.DashboardManager.DAL;
using Microservice.DashboardManager.DAL.Models;
using Microservice.DashboardManager.Util;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.BackgroundServices
{
    internal interface IProductPriceUpdaterScopedService
    {
        Task UpdatePrices(CancellationToken stoppingToken);
    }

    public class ProductPriceUpdaterScopedService : IProductPriceUpdaterScopedService
    {
        private const int AdditionalMinutes = 15;
        private const int NumStoredDays = 11;
        private const char Delim = ',';
        private readonly ILogger<ProductPriceUpdaterScopedService> _logger;
        private readonly ApplicationContext _dbContext;
        private readonly IConfiguration _configuration;

        public ProductPriceUpdaterScopedService(ApplicationContext dbContext, ILogger<ProductPriceUpdaterScopedService> logger, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _logger = logger;
            _configuration = configuration;
        }

        public async Task UpdatePrices(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Started background service \"ProductPriceUpdater\"");
            //await Task.Delay(TimeSpan.FromSeconds(GetSecondsUntilMidnight()), stoppingToken);
            _logger.LogInformation("Background service \"ProductPriceUpdater\" is working");
            while (!stoppingToken.IsCancellationRequested)
            {
                await UpdatePrice();
                _logger.LogInformation("The prices have been updated");
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
            _logger.LogCritical("Background service has been stopped! (\"ProductPriceUpdater\")");
        }

        private static int GetSecondsUntilMidnight()
        {
            var now = DateTime.UtcNow;
            var hours = 23 - now.Hour;
            var minutes = 59 - now.Minute;
            var seconds = 59 - now.Second;
            var secondsTillMidnight = hours * 3600 + (minutes + AdditionalMinutes) * 60 + seconds;
            return secondsTillMidnight;
        }

        private async Task UpdatePrice()
        {
            await RunCommoditiesApiPrice();

            await DeleteOldPrices();
        }

        private async Task DeleteOldPrices()
        {
            var oldData = _dbContext.ProductPriceHistory.Where(x =>
                x.Date <= SharedTools.ConvertFromJsonDate(DateTime.UtcNow).AddDays(NumStoredDays));

            _dbContext.ProductPriceHistory.RemoveRange(oldData);

            await _dbContext.SaveChangesAsync();
        }

        private string GetAllProductsCodes()
        {
            var codes = new StringBuilder();
            _dbContext.Products.Where(x => x.Code != null).Select(x => codes.Append(x.Code + Delim));

            return codes.ToString().Trim(Delim);
        }

        private async Task RunCommoditiesApiPrice()
        {
            var commoditiesSettings = _configuration.GetSection("Prices").GetSection("Commodities");

            var commoditiesApiBase = commoditiesSettings["BaseUrl"];
            var accessKey = $"access_key={commoditiesSettings["AccessKey"]}";
            var baseCurrency = $"base={commoditiesSettings["Currency"]}";
            var productsCodes = $"symbols={GetAllProductsCodes()}";

            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.GetAsync($"{commoditiesApiBase}?{accessKey}&{baseCurrency}&{productsCodes}");

            if (!response.IsSuccessStatusCode) return;

            var jsonData = JsonSerializer.Deserialize<CommoditiesJson.Root>(response.Content.ReadAsStringAsync().Result);

            var productPriceHistories = new List<ProductPriceHistory>();
            foreach (var prop in jsonData.Data.Rates.GetType().GetProperties())
            {
                var priceHistory = new ProductPriceHistory();

                var product = _dbContext.Products
                    .FirstOrDefault(x => x.Code == prop.Name);
                if (product == null)
                    continue;

                priceHistory.ProductId = product.Id;
                priceHistory.Date = SharedTools.ConvertFromJsonDate(DateTime.UtcNow);

                var productPriceObj = prop.GetValue(jsonData.Data.Rates, null);
                decimal productPrice;
                if (productPriceObj != null)
                    productPrice = decimal.Parse(productPriceObj.ToString()[..(productPriceObj.ToString().Length <= 27 ? productPriceObj.ToString().Length : 28)]);
                else
                    continue;

                priceHistory.Price = productPrice;
                productPriceHistories.Add(priceHistory);

                product.CurrentPrice = priceHistory.Price;
                _dbContext.Products.Update(product);
                await _dbContext.SaveChangesAsync();
            }

            await _dbContext.ProductPriceHistory.AddRangeAsync(productPriceHistories);
            await _dbContext.SaveChangesAsync();
        }
    }
}