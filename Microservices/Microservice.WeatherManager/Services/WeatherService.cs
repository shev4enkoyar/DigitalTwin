using Grpc.Core;
using Microservice.WeatherManager.DAL;
using Microservice.WeatherManager.DAL.Models;
using Microservice.WeatherManager.Protos;
using Microservice.WeatherManager.Util.JsonModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using Shared;

namespace Microservice.WeatherManager.Services
{
    /// <summary>
    /// 
    /// </summary>
    public class WeatherService : Protos.WeatherService.WeatherServiceBase
    {
        /// <summary>
        /// 
        /// </summary>
        private int RowsInDay { get; } = 24;

        /// <summary>
        /// 
        /// </summary>
        private ApplicationContext DbContext { get; }
        public WeatherService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        public override async Task GetWeather(Request request, IServerStreamWriter<WeatherReply> responseStream, ServerCallContext context)
        {
            const string weatherBase = "https://api.open-meteo.com/v1/forecast?";
            var latLng = $"latitude={request.Lat}&longitude={request.Lng}";
            var attributes = $"hourly=temperature_2m,precipitation,evapotranspiration,soil_moisture_0_1cm";
            var dates = $"start_date={DateTime.UtcNow.AddDays(-30):yyyy-MM-dd}&end_date={DateTime.UtcNow:yyyy-MM-dd}";
            var reply = new WeatherReply();
            if (IsWeatherUpdated(request.ModelId))
            {
                reply.Weathers.AddRange(GetProtoWeathers(request.ModelId));
                await responseStream.WriteAsync(reply);
                await Task.FromResult(reply);
                return;
            }

            if (DbContext.Weathers.Any(x => x.ModelId.Equals(request.ModelId)))
            {
                DbContext.RemoveRange(DbContext.Weathers.Where(x => x.ModelId.Equals(request.ModelId)));
                await DbContext.SaveChangesAsync();
            }

            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var response = await client.GetAsync($"{weatherBase}{latLng}&{attributes}&{dates}");
            if (response.IsSuccessStatusCode)
            {
                var jsonWeather = JsonSerializer.Deserialize<HourlyWeather.Root>(response.Content.ReadAsStringAsync().Result);

                var lastRow = 23;
                var temperaturs = new List<double>();
                var precipitations = new List<double>();
                var soilMoistures = new List<double>();
                var evapotranspirations = new List<double>();
                for (var i = 0; i < jsonWeather.Hourly.Time.Count; i++)
                {
                    temperaturs.Add(jsonWeather.Hourly.Temperature2m[i]);
                    precipitations.Add(jsonWeather.Hourly.Precipitation[i]);
                    soilMoistures.Add(jsonWeather.Hourly.SoilMoisture01cm[i]);
                    evapotranspirations.Add(jsonWeather.Hourly.Evapotranspiration[i]);
                    if (i == lastRow)
                    {
                        lastRow += RowsInDay;
                        DbContext.Add(new Weather
                        {
                            ModelId = request.ModelId,
                            Date = SharedTools.ConvertFromJsonDate(DateTime.Parse(jsonWeather.Hourly.Time[i])),
                            TemperatureAvg = temperaturs.Average(),
                            PrecipitationAvg = precipitations.Average(),
                            SoilMoistureAvg = soilMoistures.Average(),
                            EvapotranspirationAvg = soilMoistures.Average()
                        });
                    }
                }
                await DbContext.SaveChangesAsync();
            }

            reply.Weathers.AddRange(GetProtoWeathers(request.ModelId));

            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        private bool IsWeatherUpdated(int modelId)
        {
            var dbDate = SharedTools.ConvertFromJsonDate(DateTime.UtcNow);
            return DbContext.Weathers.Any(x => x.ModelId.Equals(modelId) && x.Date.Equals(dbDate));
        }

        private IEnumerable<WeatherProto> GetProtoWeathers(int modelId)
        {
            return DbContext.Weathers
                .Where(x => x.ModelId.Equals(modelId))
                .Select(x => new WeatherProto()
                {
                    Date = x.Date.ToShortDateString(),
                    Temperature = x.TemperatureAvg,
                    Precipitation = x.PrecipitationAvg,
                    SoilMoisture = x.SoilMoistureAvg,
                    Evapotranspiration = x.EvapotranspirationAvg
                })
                .ToList();
        }
    }
}
