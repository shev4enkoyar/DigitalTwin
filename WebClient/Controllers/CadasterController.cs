using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using WebClient.Controllers.Base;

namespace WebClient.Controllers
{
    /// <summary>
    /// Cadaster number controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CadasterController : CustomControllerBase
    {
        /// <summary>
        /// Configuration file access property
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public CadasterController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        /// <summary>
        /// Cadaster number verification method
        /// </summary>
        /// <param name="cadaster">Cadaster number</param>
        /// <returns>Status 200 if successful, otherwise 404</returns>
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
