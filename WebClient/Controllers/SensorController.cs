using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Shared;
using System;
using System.Net.Http;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        [HttpPost("send/{sensorId}")]
        public async Task<IActionResult> SendAsync(string sensorId, [FromBody] Root content)
        {
            if (!Guid.TryParse(sensorId, out Guid sensorGuid))
                return BadRequest($"Parsing sensorId ({sensorId}) to GUID not successful");

            HttpClient client = MicroservicesIP.GatewayHttpClient;

            var contentSend = new StringContent(JsonConvert.SerializeObject(content), Encoding.UTF8, "application/json");

            HttpResponseMessage response = await client.PostAsync(
                    $"api/sensor", contentSend
                    );

            if (response.IsSuccessStatusCode)
                return Ok(content);

            return BadRequest();
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
