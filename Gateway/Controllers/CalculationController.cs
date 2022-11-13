using Grpc.Core;
using Grpc.Net.Client;
using Microservice.ForecastManager.Protos;
using Microservice.MapManager.Protos;
using Microservice.WeatherManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculationController : WeatherControllerBase
    {
        [HttpGet("get_task_influence/{modelId}")]
        public async Task<double> GetTaskInfluenceByModelAsync(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Forecast,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );

            int[] dons = new int[5] { 1, 1, 0, 1, 1 };
            int[] dots = new int[5] { 0, 0, 1, 1, 1 };

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

            double g = 0.7; // калибровочный коэффициент, хз где его брать, по идее у каждой культуры свой
            double gtcOptinal = 1; // оптимальный гтк для данной культуры. Либо вводится челом, либо можно нагуглить
            int[] temperatureByMonth = new int[30] { 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0 };
            int averageTemperature = (int)temperatureByMonth.Average(); // нужно для осадков
            int[] maxAirTemperature = new int[5] { 15, 25, 6, 31, 2 };
            int[] minAirTemperature = new int[5] { 7, 15, 3, 26, -3 };
            int[] precipitationAmount = new int[5] { 7, 15, 3, 26, -3 };

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Forecast,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
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
            int[] dons = new int[5] { 1, 1, 0, 1, 1 };
            int[] dots = new int[5] { 0, 0, 1, 1, 1 };
            double g = 0.7; // калибровочный коэффициент, хз где его брать, по идее у каждой культуры свой
            double gtcOptinal = 1; // оптимальный гтк для данной культуры. Либо вводится челом, либо можно нагуглить
            int[] temperatureByMonth = new int[30] { 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0, 10, 20, 4, 30, 0 };
            int averageTemperature = (int)temperatureByMonth.Average(); // нужно для осадков
            int[] maxAirTemperature = new int[5] { 15, 25, 6, 31, 2 };
            int[] minAirTemperature = new int[5] { 7, 15, 3, 26, -3 };
            int[] precipitationAmount = new int[5] { 7, 15, 3, 26, -3 };

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Forecast,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
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

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Forecast,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
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

            if (reply != null)
            {
                DateTime currentDate = ConvertFromJsonDate(DateTime.UtcNow);
                return weather.FirstOrDefault(x => DateTime.ParseExact(x.Date, "MM/dd/yyyy", CultureInfo.InvariantCulture).Equals(currentDate)).Evapotranspiration;
            }
            return 0;
        }

        private DateTime ConvertFromJsonDate(DateTime jsonDate)
        {
            return new DateTime(jsonDate.Year, jsonDate.Month, jsonDate.Day);
        }


    }
}
