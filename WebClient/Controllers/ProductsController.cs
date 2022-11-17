using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
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
            IEnumerable<ProductProto> result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/model/get_products");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<ProductProto>>(json);
            }
            return result;
        }
    }
}
