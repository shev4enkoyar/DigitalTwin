using Grpc.Net.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebClient.Controllers.Base;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MapController : CustomControllerBase
    {
        [HttpGet("get_area/{modelId}")]
        public async Task<double> ValidateCadasterAsync(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/map/get_area/{modelId}");
            if (!response.IsSuccessStatusCode)
                return 0;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<double>(json);
            return result;
        }
    }
}
