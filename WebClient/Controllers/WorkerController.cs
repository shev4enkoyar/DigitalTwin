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
    [ApiController]
    [Route("api/[controller]")]
    public class WorkerController : CustomControllerBase
    {
        /// <summary>
        /// Property for getting data from a configuration file
        /// </summary>
        public IConfiguration Configuration { get; }
        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public WorkerController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet("get_posts")]
        public async Task<IEnumerable<PostProto>> GetAllPosts()
        {
            var response = await ConnectionClient.GetAsync($"api/worker/get_posts");
            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var reply = JsonConvert.DeserializeObject<IEnumerable<PostProto>>(json);
            return reply;
        }

        [HttpGet("create")]
        public async Task<IActionResult> CreateDigitalModel(int modelId, int postId, double rate, double salary, string fio = "ФИО не указано")
        {
            var response = await ConnectionClient.GetAsync($"api/worker/create?modelId={modelId}&" +
                                                           $"postId={postId}&fio={fio}&rate={rate}&salary={salary}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }
    }
}
