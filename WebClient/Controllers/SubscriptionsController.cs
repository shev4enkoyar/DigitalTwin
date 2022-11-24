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

namespace WebClient.Controllers
{
    /// <summary>
    /// Company Subscription Interaction Controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class SubscriptionsController : CustomControllerBase
    {
        /// <summary>
        /// User management property
        /// </summary>
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// Database access property
        /// </summary>
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Property for accessing the configuration file
        /// </summary>
        public IConfiguration Configuration { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public SubscriptionsController(IConfiguration configuration, UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            Configuration = configuration;
            _userManager = userManager;
            _dbContext = dbContext;
        }

        /// <summary>
        /// Method for getting all possible subscriptions
        /// </summary>
        /// <returns>Subscription slice enumeration</returns>
        [AllowAnonymous]
        [HttpGet("get_all")]
        public async Task<IEnumerable<FullSubscriptionModel>> GetAllSubscriptions()
        {
            var response = await ConnectionClient.GetAsync($"api/subscription/get_all");
            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var reply = JsonConvert.DeserializeObject<IEnumerable<SubscriptionClientProto>>(json);

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

        /// <summary>
        /// Subscription activation method
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <param name="days">Num days</param>
        /// <param name="subscriptionId">Subscription Id</param>
        /// <returns>Status 200 if successful, otherwise 400</returns>
        [HttpGet("activate/{modelId:int}")]
        public async Task<IActionResult> ActivateSubscription(int modelId, int days, int subscriptionId)
        {
            var response = await ConnectionClient.GetAsync(
                    $"api/subscription/activate/{modelId}?days={days}&subscriptionId={subscriptionId}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }

        /// <summary>
        /// User Subscription Activation Update Method
        /// </summary>
        /// <param name="days">Num days</param>
        /// <param name="subscriptionId">Subscription Id</param>
        /// <returns>Status 200 if successful, otherwise 400</returns>
        [HttpGet("update")]
        public async Task<IActionResult> UpdateActivatedSubscription(int days, int subscriptionId)
        {
            var response = await ConnectionClient.GetAsync(
                    $"api/subscription/update?days={days}&subscriptionId={subscriptionId}");

            if (response.IsSuccessStatusCode)
                return Ok();
            return BadRequest();
        }

        /// <summary>
        /// Method for getting all company subscriptions
        /// </summary>
        /// <returns>Company subscription string</returns>
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