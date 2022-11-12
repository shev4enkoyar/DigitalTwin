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

namespace Microservice.WeatherManager.Services
{
    public class WeatherService : Protos.WeatherService.WeatherServiceBase
    {
        private readonly ApplicationContext _dbContext;
        public WeatherService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task GetWeather(Request request, IServerStreamWriter<WeatherReply> responseStream, ServerCallContext context)
        {
            string weatherBase = "https://api.open-meteo.com/v1/forecast?";
            string latlng = $"latitude={request.Lat}&longitude={request.Lng}";
            string attributes = $"hourly=temperature_2m,precipitation,soil_moisture_0_1cm";
            string dates = $"start_date={DateTime.UtcNow.AddDays(-30):yyyy’-‘MM’-‘dd}&end_date={DateTime.UtcNow:yyyy’-‘MM’-‘dd}";
            WeatherReply reply = new WeatherReply();
            if (IsWeatherUpdated(request.ModelId))
            {
                reply.Weathers.AddRange(GetProtoWeathers(request.ModelId));
                await responseStream.WriteAsync(reply);
                await Task.FromResult(reply);
                return;
            }

            if (_dbContext.Weathers.Any(x => x.ModelId.Equals(request.ModelId)))
            {
                _dbContext.RemoveRange(_dbContext.Weathers.Where(x => x.ModelId.Equals(request.ModelId)));
                _dbContext.SaveChanges();
            }

            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            /*HttpResponseMessage response = await client.GetAsync($"{weatherBase}{latlng}&{attributes}&{dates}");*/
            HttpResponseMessage response = await client.GetAsync("https://api.open-meteo.com/v1/forecast?latitude=60.06&longitude=30.46&hourly=temperature_2m,precipitation,soil_moisture_0_1cm&start_date=2022-10-12&end_date=2022-11-12");
            HourlyWeather.Root jsonWeather;
            if (response.IsSuccessStatusCode)
            {
                var content = response.Content.ReadAsStringAsync().Result;
                jsonWeather = JsonSerializer.Deserialize<HourlyWeather.Root>(content);

                int lastRow = 23;
                List<double> temperaturs = new List<double>();
                List<double> precipitations = new List<double>();
                List<double> soilMoistures = new List<double>();
                for (int i = 0; i < jsonWeather.Hourly.Time.Count; i++)
                {
                    temperaturs.Add(jsonWeather.Hourly.Temperature2m[i]);
                    precipitations.Add(jsonWeather.Hourly.Precipitation[i]);
                    soilMoistures.Add(jsonWeather.Hourly.SoilMoisture01cm[i]);
                    if (i == lastRow)
                    {
                        lastRow += 24;
                        _dbContext.Add(new Weather
                        {
                            ModelId = request.ModelId,
                            Date = ConvertFromJsonDate(DateTime.Parse(jsonWeather.Hourly.Time[i])),
                            TemperatureAvg = temperaturs.Average(),
                            PrecipitationAvg = precipitations.Average(),
                            SoilMoistureAvg = soilMoistures.Average()
                        });
                    }
                }
                _dbContext.SaveChanges();
            }



            reply.Weathers.AddRange(GetProtoWeathers(request.ModelId));

            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        private bool IsWeatherUpdated(int modelId)
        {
            DateTime curDate = DateTime.UtcNow;
            DateTime dbDate = ConvertFromJsonDate(curDate);
            return _dbContext.Weathers.Any(x => x.ModelId.Equals(modelId) && x.Date.Equals(dbDate));
        }

        private IEnumerable<WeatherProto> GetProtoWeathers(int modelId)
        {
            return _dbContext.Weathers
                        .Where(x => x.ModelId.Equals(modelId))
                        .Select(x => new WeatherProto()
                        {
                            Date = x.Date.ToShortDateString(),
                            Temperature = x.TemperatureAvg,
                            Precipitation = x.PrecipitationAvg,
                            SoilMoisture = x.SoilMoistureAvg
                        })
                        .ToList();

        }

        private DateTime ConvertFromJsonDate(DateTime jsonDate)
        {
            return new DateTime(jsonDate.Year, jsonDate.Month, jsonDate.Day);
        }
    }
}
