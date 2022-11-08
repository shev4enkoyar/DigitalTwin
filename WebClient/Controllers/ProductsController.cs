
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Shared;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        public IConfiguration Configuration { get; }

        public ProductsController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductProto>> Get()
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            IEnumerable<ProductProto> result = null;
            HttpResponseMessage response = await client.GetAsync($"api/model/get_products");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<ProductProto>>(json);

            }
            return result;
        }
    }
}
