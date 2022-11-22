using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TransportController : CustomControllerBase
    {
        [HttpGet("get_all")]
        public async Task<IEnumerable<TransportProto>> GetAllTransport()
        {
            var response = await ConnectionClient.GetAsync($"api/transport/get_all");
            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var reply = JsonConvert.DeserializeObject<IEnumerable<TransportProto>>(json);
            return reply;
        }
    }
}

