using Grpc.Net.Client;
using Microservice.ForecastManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculationController : ControllerBase
    {
        [HttpPost("get_task_influence/{modelId}")]
        public async Task<double> GetTaskInfluenceByModelAsync(string modelId)
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
            if(reply != null)
                return reply.Result;
            return 0;
        }

        [HttpPost("get_weather_influence/{modelId}")]
        public async Task<double> GetWeatherInfluenceByModelAsync(string modelId)
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
            var request = new WeatherInfluenceRequest();
            request.AverageTemperature = averageTemperature;
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

        [HttpPost("get_overall_influence/{modelId}")]
        public async Task<double> GetOverallInfluenceByModelAsync(string modelId)
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
            var request = new OverallInfluenceRequest();
            request.AverageTemperature = averageTemperature;
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
    }
}
