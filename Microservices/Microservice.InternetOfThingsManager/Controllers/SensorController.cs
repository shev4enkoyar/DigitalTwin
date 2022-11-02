using Microservice.InternetOfThingsManager.DAL;
using Microservice.InternetOfThingsManager.DAL.Models;
using Microservice.InternetOfThingsManager.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace Microservice.InternetOfThingsManager.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SensorController : ControllerBase
    {
        private readonly ApplicationContext _dbContext;

        public SensorController(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("send/{sensorGuid}")]
        public async Task<IActionResult> SendData(string sensorGuid, [FromBody] string sensorData)
        {
            #region Checks

            if (Guid.TryParse(sensorGuid, out var sensorId))
                return BadRequest("Invalid sensor number");
            if (string.IsNullOrEmpty(sensorData))
                return BadRequest("Empty body");
            if (await _dbContext.Sensors.AnyAsync(x => x.Id.Equals(sensorId)))
                return BadRequest("Sensor not found");

            #endregion
            try
            {
                SensorJsonData sensorJson = JsonSerializer.Deserialize<SensorJsonData>(sensorData);
            }
            catch (JsonException)
            {
                return BadRequest("Invalid JSON");
            }

            _dbContext.SensorDatas.Add(new SensorData { SensorId = sensorId.ToString(), CreateDate = DateTime.UtcNow }); //TODO Add some properties
            return Ok();
        }
    }
}
