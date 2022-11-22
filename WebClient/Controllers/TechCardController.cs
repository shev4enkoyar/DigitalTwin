using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Models;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TechCardController : CustomControllerBase
    {
        public IConfiguration Configuration { get; }
        private readonly UserManager<ApplicationUser> _userManager;

        public TechCardController(IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            Configuration = configuration;
        }

        [HttpGet("get_all")]
        public async Task<IEnumerable<ModelProto>> GetDigitalModels()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return null;
            var user = await _userManager.FindByIdAsync(userId);

            string companyId = user.CompanyId.ToString();

            IEnumerable<ModelProto> result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/model/get_models/{companyId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<ModelProto>>(json);
            }
            return result;
        }

        [HttpGet("create")]
        public async Task<IActionResult> CreateDigitalModel(int productId, string name, string cadaster = null, string categoryName = null)
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();
            var user = await _userManager.FindByIdAsync(userId);
            string companyId = user.CompanyId.ToString();

            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/model/create?companyId={companyId}&" +
                $"productId={productId}&name={name}&cadaster={cadaster}&categoryName={categoryName}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }
    }
}