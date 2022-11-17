using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Shared;
using System.Net.Http;
using System.Threading.Tasks;
using WebClient.Controllers.Base;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ForecastController : CustomControllerBase
    {
        [HttpGet("get_overall_influence/{modelId}")]
        public async Task<double> GetOverallInfluenceByModel(int modelId)
        {
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/calculation/get_overall_influence/{modelId}");
            double result = 0;
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<double>(json);
            }
            return result;
        }

        [HttpGet("get_task_influence/{modelId}")]
        public async Task<double> GetTaskInfluenceByModelAsync(int modelId)
        {
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/calculation/get_task_influence/{modelId}");
            double result = 0;
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<double>(json);
            }
            return result;
        }

        [HttpGet("get_weather_influence/{modelId}")]
        public async Task<double> GetWeatherInfluenceByModelAsync(int modelId)
        {
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/calculation/get_weather_influence/{modelId}");
            double result = 0;
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<double>(json);
            }
            return result;
        }
    }
}
