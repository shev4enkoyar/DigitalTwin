using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Shared;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Data;
using WebClient.Models;
using WebClient.Models.SubModels;
using WebClient.Util;

namespace WebClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _dbContext;
        public IConfiguration Configuration { get; }

        public SubscriptionsController(IConfiguration configuration, UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            Configuration = configuration;
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpGet("get_all")]
        public async Task<IEnumerable<FullSubscriptionModel>> GetAllSubscriptions()
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            IEnumerable<SubscriptionClientProto> reply = null;
            HttpResponseMessage response = await client.GetAsync($"api/subscription/get_all");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                reply = JsonConvert.DeserializeObject<IEnumerable<SubscriptionClientProto>>(json);
            }

            if (reply == null)
                return null;

            List<FullSubscriptionModel> result = new List<FullSubscriptionModel>();
            foreach (var subscription in reply)
            {
                List<string> functions = new List<string>();
                foreach (var id in subscription.FunctionalAccess.Split(";"))
                {
                    functions.Add(_dbContext.Functionals.FirstOrDefault(x => x.Id == int.Parse(id)).Name);
                }
                result.Add(new FullSubscriptionModel { Id = subscription.Id, Functions = functions, Name = subscription.Name, Price = subscription.Price });
            }
            return result;
        }

        [Authorize]
        [HttpGet("activate/{modelId}")]
        public async Task<IActionResult> ActivateSubscription(int modelId, int days, int subscriptionId)
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            HttpResponseMessage response = await client.GetAsync(
                    $"api/subscription/activate/{modelId}?days={days}&subscriptionId={subscriptionId}"
                    );

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }

        [Authorize]
        [HttpGet("update")]
        public async Task<IActionResult> UpdateActivatedSubscription(int days, int subscriptionId)
        {
            //TODO REDO
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            HttpResponseMessage response = await client.GetAsync(
                    $"api/subscription/update?days={days}&subscriptionId={subscriptionId}"
                    );

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }

        [Authorize]
        [HttpGet("get_all_by_company")]
        public async Task<string> GetAllSubscriptionsByCompany()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return null;
            var user = await _userManager.FindByIdAsync(userId);

            string companyId = user.CompanyId.ToString();

            HttpClient client = MicroservicesIP.GatewayHttpClient;

            Dictionary<string, List<string>> result = null;
            HttpResponseMessage response = await client.GetAsync(
                $"api/subscription/get_models_with_subscriptions/{companyId}"
                );
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(json);

            }
            return JsonConvert.SerializeObject(result);
        }
    }
}