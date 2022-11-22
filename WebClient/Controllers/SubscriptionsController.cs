using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Models;
using WebClient.Models.SubModels;
using WebClient.Util;

namespace WebClient.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionsController : CustomControllerBase
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
            IEnumerable<SubscriptionClientProto> reply = null;
            var response = await ConnectionClient.GetAsync($"api/subscription/get_all");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                reply = JsonConvert.DeserializeObject<IEnumerable<SubscriptionClientProto>>(json);
            }

            return reply?.Select(subscription => new
            {
                subscription,
                functions = subscription.FunctionalAccess.Split(";")
                        .Select(id => _dbContext.Functionals.FirstOrDefault(x => x.Id == int.Parse(id))?.Name)
                        .ToList()
            })
                .Select(t => new FullSubscriptionModel
                {
                    Id = t.subscription.Id,
                    Functions = t.functions,
                    Name = t.subscription.Name,
                    Price = t.subscription.Price
                }).ToList();
        }

        [Authorize]
        [HttpGet("activate/{modelId:int}")]
        public async Task<IActionResult> ActivateSubscription(int modelId, int days, int subscriptionId)
        {
            var response = await ConnectionClient.GetAsync(
                    $"api/subscription/activate/{modelId}?days={days}&subscriptionId={subscriptionId}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }

        [Authorize]
        [HttpGet("update")]
        public async Task<IActionResult> UpdateActivatedSubscription(int days, int subscriptionId)
        {
            var response = await ConnectionClient.GetAsync(
                    $"api/subscription/update?days={days}&subscriptionId={subscriptionId}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }

        [Authorize]
        [HttpGet("get_all_by_company")]
        public async Task<string> GetAllSubscriptionsByCompany()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return null;
            var user = await _userManager.FindByIdAsync(userId);

            var companyId = user.CompanyId.ToString();

            var response = await ConnectionClient.GetAsync(
                $"api/subscription/get_models_with_subscriptions/{companyId}");
            if (!response.IsSuccessStatusCode)
                return null;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<Dictionary<string, List<string>>>(json);
            return JsonConvert.SerializeObject(result);
        }
    }
}