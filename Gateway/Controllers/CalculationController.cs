using Grpc.Net.Client;
using Microservice.ForecastManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Gateway.Controllers.Base;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculationController : WeatherControllerBase
    {
        [HttpGet("get_task_influence/{modelId}")]
        public async Task<double> GetTaskInfluenceByModelAsync(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Forecast,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var dons = new[] { 1, 1, 0, 1, 1 };
            var dots = new[] { 0, 0, 1, 1, 1 };

            var client = new InfluenceCalculationService.InfluenceCalculationServiceClient(channel);
            var request = new TaskInfluenceRequest();
            request.Dons.AddRange(dons);
            request.Dots.AddRange(dots);
            var reply = await client.GetTaskInfluenceAsync(request);
            if (reply != null)
                return reply.Result;
            return 0;
        }

        [HttpGet("get_weather_influence/{modelId}")]
        public async Task<double> GetWeatherInfluenceByModelAsync(int modelId)
        {

            const double g = 0.7; // калибровочный коэффициент, хз где его брать, по идее у каждой культуры свой
            double gtcOptinal = 1; // оптимальный гтк для данной культуры. Либо вводится челом, либо можно нагуглить
            var temperatureByMonth = new[] { 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0 };
            var averageTemperature = (int)temperatureByMonth.Average(); // нужно для осадков
            var maxAirTemperature = new[] { 15, 25, 6, 31, 2 };
            var minAirTemperature = new[] { 7, 15, 3, 26, -3 };
            var precipitationAmount = new[] { 7, 15, 3, 26, -3 };

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Forecast,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var client = new InfluenceCalculationService.InfluenceCalculationServiceClient(channel);
            var request = new WeatherInfluenceRequest
            {
                AverageTemperature = averageTemperature
            };
            request.MaxAirTemperature.AddRange(maxAirTemperature);
            request.MinAirTemperature.AddRange(minAirTemperature);
            request.PrecipitationAmount.AddRange(precipitationAmount);
            request.G = g;
            request.GtcOptinal = gtcOptinal;

            var reply = await client.GetWeatherInfluenceInfluenceAsync(request);
            if (reply != null)
                return reply.Result;
            return 0;
        }

        [HttpGet("get_overall_influence/{modelId}")]
        public async Task<double> GetOverallInfluenceByModelAsync(int modelId)
        {
            var dons = new[] { 1, 1, 0, 1, 1 };
            var dots = new[] { 0, 0, 1, 1, 1 };
            var g = 0.7; // калибровочный коэффициент, хз где его брать, по идее у каждой культуры свой
            double gtcOptinal = 1; // оптимальный гтк для данной культуры. Либо вводится челом, либо можно нагуглить
            var temperatureByMonth = new[] { 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0 };
            var averageTemperature = (int)temperatureByMonth.Average(); // нужно для осадков
            var maxAirTemperature = new[] { 15, 25, 6, 31, 2 };
            var minAirTemperature = new[] { 7, 15, 3, 26, -3 };
            var precipitationAmount = new[] { 7, 15, 3, 26, -3 };

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Forecast,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var client = new InfluenceCalculationService.InfluenceCalculationServiceClient(channel);

            var request = new OverallInfluenceRequest
            {
                AverageTemperature = averageTemperature
            };
            request.MaxAirTemperature.AddRange(maxAirTemperature);
            request.MinAirTemperature.AddRange(minAirTemperature);
            request.PrecipitationAmount.AddRange(precipitationAmount);
            request.G = g;
            request.GtcOptinal = gtcOptinal;
            request.Dons.AddRange(dons);
            request.Dots.AddRange(dots);

            var reply = await client.GetOverallInfluenceAsync(request);
            if (reply != null)
                return reply.Result;
            return 0;
        }

        [HttpGet("get_evapotranspiration/{modelId}")]
        public async Task<double> GetEvapotranspiration(int modelId)
        {
            var weather = await GetWeather(modelId);

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Forecast,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var client = new InfluenceCalculationService.InfluenceCalculationServiceClient(channel);
            var request = new EvapotranspirationRequest()
            {
                Rn = 12,
                G = 42.131231,
                P = 3.2133,
                T = 4.23,
                U = 5.3123,
                Ea = 6.23213,
                Es = 7.213123,
                Svpk = 8.321312,
                Ra = 9.2112323312,
                Rs = 10.2132133123123,
            };

            var reply = client.GetEvapotranspiration(request);

            if (reply == null) return 0;
            var currentDate = ConvertFromJsonDate(DateTime.UtcNow);
            return weather.FirstOrDefault(x => DateTime.ParseExact(x.Date, "MM/dd/yyyy", CultureInfo.InvariantCulture).Equals(currentDate))!.Evapotranspiration;
        }

        private static DateTime ConvertFromJsonDate(DateTime jsonDate)
        {
            return new DateTime(jsonDate.Year, jsonDate.Month, jsonDate.Day);
        }


    }
}
