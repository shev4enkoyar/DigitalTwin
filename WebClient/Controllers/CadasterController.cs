﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Shared;
using System.Net.Http;
using System.Threading.Tasks;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CadasterController : ControllerBase
    {
        public IConfiguration Configuration { get; }

        public CadasterController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet("validate/{cadaster}")]
        public async Task<IActionResult> ValidateCadaster(string cadaster)
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            HttpResponseMessage response = await client.GetAsync($"api/model/validate_cadaster/{cadaster}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return NotFound();
        }
    }
}
