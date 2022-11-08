using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json.Serialization;


//DONE
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
