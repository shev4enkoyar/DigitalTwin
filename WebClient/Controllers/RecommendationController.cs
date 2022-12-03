using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    /// <summary>
    /// Product Management Controller
    /// </summary>
    [Authorize]
    [Route("api/[controller]")]
    public class RecommendationController : CustomControllerBase
    {
        /// <summary>
        /// Configuration file access property
        /// </summary>
        public IConfiguration Configuration { get; }

        public RecommendationController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet("get_all/{modelId}")]
        public async Task<IEnumerable<ModelRecommendation>> GetAllByModelId(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/recommendation/get_all/{modelId}");
            if (!response.IsSuccessStatusCode)
                return null;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ModelRecommendation>>(json);
            return result;
        }
    }
}
