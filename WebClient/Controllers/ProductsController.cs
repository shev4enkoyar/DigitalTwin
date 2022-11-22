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
    [Authorize]
    [Route("api/[controller]")]
    public class ProductsController : CustomControllerBase
    {
        public IConfiguration Configuration { get; }

        public ProductsController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductProto>> Get()
        {
            var response = await ConnectionClient.GetAsync($"api/model/get_products");
            if (!response.IsSuccessStatusCode)
                return null;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ProductProto>>(json);
            return result;
        }
    }
}
