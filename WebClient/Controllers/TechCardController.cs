using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Models;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    /// <summary>
    /// Controller for interaction with the technological map
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TechCardController : CustomControllerBase
    {
        /// <summary>
        /// Property for getting data from a configuration file
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// User interaction property
        /// </summary>
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public TechCardController(IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
            Configuration = configuration;
        }

        /// <summary>
        /// Retrieval Method of technological maps list
        /// </summary>
        /// <returns>List of technological maps of the company</returns>
        [HttpGet("get_all")]
        public async Task<IEnumerable<ModelProto>> GetDigitalModels()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return null;

            var user = await _userManager.FindByIdAsync(userId);

            return await GetDigitalModelsByCompanyId(user.CompanyId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="companyId">Company Id</param>
        /// <returns>List of technological maps of the company</returns>
        private async Task<IEnumerable<ModelProto>> GetDigitalModelsByCompanyId(Guid? companyId)
        {
            if (companyId == null) return null;

            var response = await ConnectionClient.GetAsync($"api/model/get_models/{companyId.ToString()}");
            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ModelProto>>(json);
            return result;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="productId">Product Id</param>
        /// <param name="name">Technological map name</param>
        /// <param name="cadaster">Cadaster number</param>
        /// <param name="categoryName">Category name</param>
        /// <returns>Status 200 if everything went well, otherwise 400 or 401</returns>
        [HttpGet("create")]
        public async Task<IActionResult> CreateDigitalModel(int productId, string name, string cadaster = null, string categoryName = null)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();
            var user = await _userManager.FindByIdAsync(userId);
            var companyId = user.CompanyId.ToString();

            var response = await ConnectionClient.GetAsync($"api/model/create?companyId={companyId}&" +
                                                           $"productId={productId}&name={name}&cadaster={cadaster}&categoryName={categoryName}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }
    }
}