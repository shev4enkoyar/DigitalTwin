using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using WebClient.Controllers.Base;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CadasterController : CustomControllerBase
    {
        public IConfiguration Configuration { get; }

        public CadasterController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet("validate/{cadaster}")]
        public async Task<IActionResult> ValidateCadaster(string cadaster)
        {
            var response = await ConnectionClient.GetAsync($"api/model/validate_cadaster/{cadaster}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return NotFound();
        }
    }
}
