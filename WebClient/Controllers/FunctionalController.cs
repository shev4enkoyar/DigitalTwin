using Grpc.Net.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/functional")]
    public class FunctionalController
    {
        [HttpGet("get_all")]
        public async Task<IEnumerable<string>> GetFunctional()
        {
            IEnumerable<string> functions = new List<string>() { "models" };
            return functions;
        }
    }
}
