using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Net.Client;
using Microservice.MapManager.Protos;
using Microservice.WeatherManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;

namespace Gateway.Controllers.Base
{
    public class WeatherControllerBase : CompanyModelsControllerBase
    {
        [HttpGet("get_weather/{modelId}")]
        public async Task<IEnumerable<WeatherProto>> GetWeather(int modelId)
        {
            if (TryGetLatLng(modelId, out var lat, out var lng))
            {
                return await GetWeatherData(lat, lng, modelId);
            }
            return null;
        }

        private async Task<IEnumerable<WeatherProto>> GetWeatherData(double lat, double lng, int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Weather,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var client = new WeatherService.WeatherServiceClient(channel);
            using var call = client.GetWeather(new Request() { Lat = lat, Lng = lng, ModelId = modelId });
            WeatherReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }

            return response?.Weathers.ToList();
        }

        private bool TryGetLatLng(int modelId, out double lat, out double lng)
        {
            lat = 0;
            lng = 0;
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Map,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var client = new MapService.MapServiceClient(channel);
            var reply = client.GetMapCenter(new GetMapCenterRequest() { ModelId = modelId });

            if (reply == null)
                return false;
            lat = reply.Lat;
            lng = reply.Lng;
            return true;
        }
    }
}
