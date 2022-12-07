using Grpc.Net.Client;
using Microservice.ForecastManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Gateway.Controllers.Base;
using System.Collections.Generic;
using Microservice.WebClient.Protos;
using Grpc.Core;

namespace Gateway.Controllers
{
    /// <summary>
    /// Controller for calculating recommendation data
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CalculationController : WeatherControllerBase
    {
        /// <summary>
        /// Method for obtaining the influence of tasks on the model
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <returns>Influence value</returns>
        [HttpGet("get_task_influence/{modelId:int}")]
        public async Task<double> GetTaskInfluenceByModelAsync(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Forecast,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
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

        /// <summary>
        /// Weather Influence Method
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <returns>Significance of weather influence</returns>
        [HttpGet("get_weather_influence/{modelId:int}")]
        public async Task<double> GetWeatherInfluenceByModelAsync(int modelId)
        {
            var weather = await GetWeather(modelId);

            const double g = 0.56; // калибровочный коэффициент, хз где его брать, по идее у каждой культуры свой
            double gtcOptinal = 1.0; // оптимальный гтк для данной культуры. Либо вводится челом, либо можно нагуглить
            double[] airTemperature = weather.Select(x => x.Temperature).ToArray();
            var averageTemperature = (int)airTemperature.Average(); // нужно для осадков
            double[] precipitationAmount = weather.Select(x => x.Precipitation).ToArray();

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Forecast,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );

            var client = new InfluenceCalculationService.InfluenceCalculationServiceClient(channel);
            var request = new WeatherInfluenceRequest
            {
                AverageTemperature = averageTemperature
            };
            request.AirTemperature.AddRange(airTemperature);
            request.PrecipitationAmount.AddRange(precipitationAmount);
            request.G = g;
            request.GtcOptinal = gtcOptinal;

            var reply = await client.GetWeatherInfluenceInfluenceAsync(request);
            if (reply != null)
                return reply.Result;
            return 0;
        }

        /// <summary>
        /// Method for obtaining the total influence on the model
        /// </summary>
        /// <param name="modelId"></param>
        /// <returns>Overall Influence</returns>
        [HttpGet("get_overall_influence/{modelId:int}")]
        public async Task<double> GetOverallInfluenceByModelAsync(int modelId)
        {
            var weather = await GetWeather(modelId);

            var dons = new int[30];
            var dots = new int[30];
            for (int i = 0; i < 30; i++)
            {
                dons[i] = 1;
                dots[i] = 1;
            }
            const double g = 0.1; // калибровочный коэффициент, хз где его брать, по идее у каждой культуры свой
            double gtcOptinal = 2.2; // оптимальный гтк для данной культуры. Либо вводится челом, либо можно нагуглить
            double[] airTemperature = weather.Select(x => x.Temperature).ToArray();
            var averageTemperature = (int)airTemperature.Average(); // нужно для осадков
            double[] precipitationAmount = weather.Select(x => x.Precipitation).ToArray();

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Forecast,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );

            var client = new InfluenceCalculationService.InfluenceCalculationServiceClient(channel);

            var request = new OverallInfluenceRequest
            {
                AverageTemperature = averageTemperature
            };
            request.AirTemperature.AddRange(airTemperature);
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

        /// <summary>
        /// Method for obtaining the evapotranspiration value
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <returns>Evapotranspiration value</returns>
        [HttpGet("get_evapotranspiration/{modelId}")]
        public async Task<double> GetEvapotranspiration(int modelId)
        {
            var weather = await GetWeather(modelId);

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Forecast,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
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
            var currentDate = SharedTools.ConvertFromJsonDate(DateTime.UtcNow);
            return weather.FirstOrDefault(x => DateTime.ParseExact(x.Date, "MM/dd/yyyy", CultureInfo.InvariantCulture).Equals(currentDate))!.Evapotranspiration;
        }

        private async Task<IEnumerable<int>> GetAllTaskIdsByModelId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );

            SendReply response = null;
            using (var call = new ModelTaskService.ModelTaskServiceClient(channel)
                .GetTasks(new SendRequest { ModelId = modelId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            return response?.Tasks.Select(x => x.Id);
        }

        private async Task<IEnumerable<DetailProto>> GetDetailsByTaskId(int taskId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );

            GetTaskReply response = null;
            using (var call = new ModelTaskService.ModelTaskServiceClient(channel)
                .GetTaskDetails(new GetTaskRequest { TaskId = taskId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            return response?.Details;
        }
    }
}
