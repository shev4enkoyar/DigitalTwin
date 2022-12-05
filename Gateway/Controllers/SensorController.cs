using Grpc.Core;
using Grpc.Net.Client;
using Microservice.InternetOfThingsManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        /// <summary>
        /// Method for sending data from the sensor to the server
        /// </summary>
        /// <param name="sensorId">Sensor Id</param>
        /// <param name="content">Json content from body</param>
        /// <returns>True if the data was recognized otherwise false</returns>
        [HttpPost("send/{sensorId}")]
        public bool SendDataToServer(string sensorId, [FromBody] Root content)
        {
            if (!Guid.TryParse(sensorId, out Guid sensorGuid))
                return false;
            //TODO Send data to sensor microservice
            return true;
        }

        [HttpGet("create")]
        public string CreateSensor(string sensorId, int modelId, string name, string functionalArray)
        {
            var request = new AddSensorRequest
            {
                Name = name,
                ModelId = modelId,
                FunctionalArray = functionalArray,
                SensorGuid = sensorId
            };

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.InternetOfThings,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var reply = new InternetOfThingsService.InternetOfThingsServiceClient(channel).AddSensor(request);

            return reply.Link;
        }

        [HttpGet("remove/{sensorId}")]
        public bool RemoveSensor(string sensorId)
        {
            var request = new RemoveSensorRequest
            {
                SensorGuid = sensorId
            };

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.InternetOfThings,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var reply = new InternetOfThingsService.InternetOfThingsServiceClient(channel).RemoveSensor(request);

            return reply.IsDeleteComplete;
        }

        [HttpGet("get_all/{modelId:int}")]
        public async Task<IEnumerable<SensorProto>> GetAllSensorsByModelId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.InternetOfThings,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );
            GetAllSensorsReply response = null;
            using (var call = new InternetOfThingsService.InternetOfThingsServiceClient(channel).GetAllSensors(new GetAllSensorsRequest { ModelId = modelId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }

            return response?.Sensors;
        }

        [HttpGet("get_all_functional")]
        public async Task<IEnumerable<SensorFunctionalProto>> GetAllSensorsFunctional()
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.InternetOfThings,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );
            GetAllSensorsFunctionalReply response = null;
            using (var call = new InternetOfThingsService.InternetOfThingsServiceClient(channel).GetAllSensorsFunctional(new GetAllSensorsFunctionalRequest()))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }

            return response?.SensorsFunctional;
        }
    }

    public class Root
    {
        [JsonPropertyName("weather")]
        public Weather Weather { get; set; }

        [JsonPropertyName("soil")]
        public Soil Soil { get; set; }
    }

    public class Soil
    {
        [JsonPropertyName("humidity")]
        public double Humidity { get; set; }

        [JsonPropertyName("temperature")]
        public double Temperature { get; set; }
    }

    public class Weather
    {
        [JsonPropertyName("pressure")]
        public int Pressure { get; set; }

        [JsonPropertyName("humidity")]
        public double Humidity { get; set; }

        [JsonPropertyName("temperature")]
        public double Temperature { get; set; }

        [JsonPropertyName("co2")]
        public double Co2 { get; set; }
    }
}
