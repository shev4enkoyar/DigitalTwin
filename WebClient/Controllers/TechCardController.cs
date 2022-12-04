using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("get_all_with_rec")]
        public async Task<IEnumerable<ModelProtoWithRecs>> GetDigitalModelsWithRecs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return null;

            var user = await _userManager.FindByIdAsync(userId);
            var models = await GetDigitalModelsByCompanyId(user.CompanyId);
            List<ModelProtoWithRecs> modelsWithRecs = new List<ModelProtoWithRecs>();
            foreach (var model in models) 
            {
                var tasks = await GetTasksByModelId(model.Id);
                string taskName = "Текущие мероприятия отстутствуют";
                if (tasks != null)
                    if(tasks.Count() > 0)
                        taskName = tasks.FirstOrDefault().Name;

                var recomendations = await GetRecomendationsByModelId(model.Id);
                string recomendationName = "Советы отстутствуют";
                if (recomendations != null)
                    if (recomendations.Count() > 0)
                        recomendationName = recomendations.FirstOrDefault().RecommendationText;
                modelsWithRecs.Add(new ModelProtoWithRecs()
                {
                    Id = model.Id,
                    CompanyId = model.CompanyId,
                    MapId = model.MapId,
                    Name = model.Name,
                    ProductCode = model.ProductCode,
                    ProductCurrentPrice = model.ProductCurrentPrice,
                    ProductName = model.ProductName,
                    RecommendationName = recomendationName,
                    TaskName = taskName
                });
            }
            return modelsWithRecs;
        }

        private async Task<IEnumerable<ModelTask>> GetTasksByModelId(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/task/get_all/{modelId}");

            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ModelTask>>(json);
            return result;
        }

        private async Task<IEnumerable<ModelRecommendation>> GetRecomendationsByModelId(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/recommendation/get_all/{modelId}");
            if (!response.IsSuccessStatusCode)
                return null;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ModelRecommendation>>(json);
            return result;
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
        public async Task<int> CreateDigitalModel(int productId, string name, string cadaster = null, string categoryName = null)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return -1;
            var user = await _userManager.FindByIdAsync(userId);
            var companyId = user.CompanyId.ToString();

            var response = await ConnectionClient.GetAsync($"api/model/create?companyId={companyId}&" +
                                                           $"productId={productId}&name={name}&cadaster={cadaster}&categoryName={categoryName}");
            if (response.IsSuccessStatusCode) 
            {
                var json = await response.Content.ReadAsStringAsync();
                if(json.IsNullOrEmpty())
                    return -1;
                int result = JsonConvert.DeserializeObject<int>(json);
                return result;
            }
                
            return -1;
        }
    }
}