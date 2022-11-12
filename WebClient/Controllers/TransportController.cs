using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Shared;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TransportController
    {
        [HttpGet("get_all")]
        public async Task<IEnumerable<TransportProto>> GetAllTransport()
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            IEnumerable<TransportProto> reply = null;
            HttpResponseMessage response = await client.GetAsync($"api/transport/get_all");
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

