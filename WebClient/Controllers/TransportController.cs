using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Shared;
using System.Collections.Generic;
using System.Net.Http;
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
            IEnumerable<TransportProto> reply = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/transport/get_all");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                reply = JsonConvert.DeserializeObject<IEnumerable<TransportProto>>(json);
            }

            if (reply == null)
                return null;
            return reply;
        }
    }
}

