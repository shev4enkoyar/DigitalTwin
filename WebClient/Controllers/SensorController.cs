using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace WebClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        [HttpPost("send/{sensorId}")]
        public IActionResult Send(string sensorId, [FromBody] string content)
        {
            if (!Guid.TryParse(sensorId, out Guid sensorGuid))
            {
                return BadRequest($"Parsing sensorId ({sensorId}) to GUID not successful");
            }
            try
            {
                Root sensorJson = JsonSerializer.Deserialize<Root>(content);
            }
            catch (JsonException)
            {
                return BadRequest("Invalid JSON");
            }
            return Ok();
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
