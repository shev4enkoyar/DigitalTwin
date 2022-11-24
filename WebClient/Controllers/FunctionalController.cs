using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
    /// User functionality management controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FunctionalController : CustomControllerBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// User management property
        /// </summary>
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// Role management property
        /// </summary>
        private readonly RoleManager<ApplicationRole> _roleManager;

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public FunctionalController(UserManager<ApplicationUser> userManage, ApplicationDbContext dbContext, RoleManager<ApplicationRole> roleManager)
        {
            _dbContext = dbContext;
            _userManager = userManage;
            _roleManager = roleManager;
        }

        /// <summary>
        /// Method for getting the functionality of the current user
        /// </summary>
        /// <returns>Function enumeration</returns>
        [HttpGet("get_all")]
        public async Task<IEnumerable<string>> GetFunctional()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            //TODO Yarick, imagine something better pls
            if (user == null)
                return null;
            var userRoles = _dbContext.UserRoles
                .Where(x => x.UserId == user.Id)
                .ToList();

            var functionalAccessIds = new HashSet<int>();
            userRoles
                .Select(x => _roleManager.FindByIdAsync(x.RoleId).Result.FunctionalAccess)
                .ToList()
                .ForEach(x => x.Split(";").ToList().ForEach(y => functionalAccessIds.Add(int.Parse(y))));

            var functions = functionalAccessIds
                .Select(functionalId =>
                    _dbContext.Functionals
                        .FirstOrDefault(x => x.Id == functionalId)?.Name)
                .ToList();

            var modelIds = await GetDigitalModels();
            if (modelIds == null)
                return functions;

            foreach (var modelId in modelIds)
            {
                var functionalIds = await GetFunctionalIdsFromSubscriptions(modelId);
                if (functionalIds == null)
                    continue;

                functionalAccessIds
                    .Intersect(functionalIds)
                    .ToList()
                    .ForEach(x => functions.Add($"{_dbContext.Functionals.FirstOrDefault(y => y.Id == x)?.Name}/{modelId}"));
            }

            return functions;
        }

        private async Task<IEnumerable<int>> GetFunctionalIdsFromSubscriptions(int modelId)
        {
            var result = new List<int>();
            var subscriptions = await GetActivatedSubscription(modelId);
            if (subscriptions == null)
                return null;

            subscriptions
                .ToList()
                .ForEach(x => x.FunctionalAccess.Split(";").ToList().ForEach(y => result.Add(int.Parse(y))));

            return result;
        }

        private async Task<IEnumerable<SubscriptionClientProto>> GetActivatedSubscription(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/subscription/get_activated_subscription/{modelId}");

            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<SubscriptionClientProto>>(json);
            return result;
        }

        private async Task<IEnumerable<int>> GetDigitalModels()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return null;
            var user = await _userManager.FindByIdAsync(userId);

            var companyId = user.CompanyId.ToString();

            var response = await ConnectionClient.GetAsync($"api/model/get_models/{companyId}");

            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ModelProto>>(json);
            return result?.Select(x => x.Id);
        }
    }
}