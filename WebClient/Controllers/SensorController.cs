using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : CustomControllerBase
    {
        [HttpPost("send/{sensorId}")]
        public async Task<IActionResult> SendAsync(string sensorId, [FromBody] Root content)
        {
            if (!Guid.TryParse(sensorId, out Guid sensorGuid))
                return BadRequest($"Parsing sensorId ({sensorId}) to GUID not successful");

            var contentSend = new StringContent(JsonConvert.SerializeObject(content), Encoding.UTF8, "application/json");

            var response = await ConnectionClient.PostAsync(
                    $"api/sensor", contentSend);

            if (response.IsSuccessStatusCode)
                return Ok(content);

            return BadRequest();
        }

        [HttpGet("create")]
        public async Task<string> CreateSensorAsync(int modelId, string name, string functionalArray)
        {
            var response = await ConnectionClient.GetAsync($"api/sensor/create?sensorId={Guid.NewGuid()}&modelId={modelId}&name={name}&functionalArray={functionalArray}");
            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<string>(json);

            return result;
        }

        [HttpGet("remove/{sensorId}")]
        public async Task<bool> RemoveSensorAsync(string sensorId)
        {
            if (!Guid.TryParse(sensorId, out Guid sensorGuid))
                return false;

            var response = await ConnectionClient.GetAsync($"api/remove/{sensorGuid}");
            if (!response.IsSuccessStatusCode)
                return false;

            return true;
        }

        [HttpGet("get_all/{modelId:int}")]
        public async Task<IEnumerable<SensorWithFunctionalProto>> GetAllSensorsWithFunctionalByModelId(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/sensor/get_all/{modelId}");
            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var sensors = JsonConvert.DeserializeObject<IEnumerable<SensorProto>>(json);
            var functional = await GetAllSensorsFunctional();
            var result = sensors.Select(x => new SensorWithFunctionalProto
            {
                Id = x.Id,
                ExpireTime = x.ExpireTime,
                InitTime = x.InitTime,
                IsEnabled = x.IsEnabled,
                ModelId = x.ModelId,
                Name = x.Name,
                FunctionalProtos = functional.Where(y => x.FunctionalArray.Split(";").Select(z => int.Parse(z)).Contains(y.Id))
            });

            return result;
        }

        [HttpGet("get_all_functional")]
        public async Task<IEnumerable<SensorFunctionalProto>> GetAllSensorsFunctional()
        {
            var response = await ConnectionClient.GetAsync($"api/sensor/get_all_functional");
            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<SensorFunctionalProto>>(json);

            return result;
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
