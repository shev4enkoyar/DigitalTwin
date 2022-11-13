using Gateway.Controllers.Base;
using Grpc.Core;
using Grpc.Net.Client;
using Microservice.MapManager.Protos;
using Microservice.WeatherManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : CompanyModelsControllerBase
    {
        [HttpGet("get_weather/{modelId}")]
        public async Task<IEnumerable<WeatherProto>> GetWeather(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Map,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );

            var client = new MapService.MapServiceClient(channel);
            var reply = await client.GetMapCenterAsync(new GetMapCenterRequest() { ModelId = modelId });


            return await GetWeatherAsync(reply.Lat, reply.Lng, modelId);
        }

        private async Task<IEnumerable<WeatherProto>> GetWeatherAsync(double lat, double lng, int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Weather,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );

            var client = new WeatherService.WeatherServiceClient(channel);
            using var call = client.GetWeather(new Request() { Lat = lat, Lng = lng, ModelId = modelId });
            WeatherReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }

            return response.Weathers.ToList();
        }
    }
}
