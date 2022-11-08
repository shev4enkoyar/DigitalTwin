using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Shared;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Data;
using WebClient.Models;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        [HttpGet("get_all/{modelId}")]
        public async Task<IEnumerable<ModelTask>> GetAllByModelId(int modelId)
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            IEnumerable<ModelTask> result = null;
            HttpResponseMessage response = await client.GetAsync($"api/task/get_all/{modelId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<ModelTask>>(json);

            }
            return result;
        }
    }

    static class TaskTypes
    {
        public static string Sowing = "Засев";
        public static string Treatment = "Обработка";
        public static string Harvesting = "Сбор";
    }
}
