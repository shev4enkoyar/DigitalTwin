using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Models;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class FunctionalController : CustomControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _dbContext;
        private readonly RoleManager<ApplicationRole> _roleManager;

        public FunctionalController(UserManager<ApplicationUser> userManage, ApplicationDbContext dbContext, RoleManager<ApplicationRole> roleManager)
        {
            _userManager = userManage;
            _dbContext = dbContext;
            _roleManager = roleManager;
        }

        [HttpGet("get_all")]
        public async Task<IEnumerable<string>> GetFunctional()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            //TODO Yarick, imagine something better pls
            if (user == null)
                return null;
            var userRoles = _dbContext.UserRoles.Where(x => x.UserId == user.Id).ToList();

            HashSet<int> functionalAccessIds = new HashSet<int>();
            userRoles.Select(x => _roleManager.FindByIdAsync(x.RoleId).Result.FunctionalAccess).ToList().ForEach(x => x.Split(";").ToList().ForEach( y => functionalAccessIds.Add(int.Parse(y)) ));

            List<string> functions = new List<string>();
            foreach (int functionalId in functionalAccessIds)
                functions.Add(_dbContext.Functionals.Where(x => x.Id == functionalId).FirstOrDefault().Name);

            IEnumerable<int> modelIds = await GetDigitalModels();
            if (modelIds == null) 
                return functions;

            foreach (int modelId in modelIds)
            {
                var functionalIds = await GetFunctionalIdsFromSubscriptions(modelId);
                functionalAccessIds.Intersect(functionalIds).ToList().ForEach(x => functions.Add( $"{_dbContext.Functionals.Where(y => y.Id == x).FirstOrDefault().Name}/{modelId}"));
            }

            return functions;
        }

        private async Task<IEnumerable<int>> GetFunctionalIdsFromSubscriptions(int modelId) 
        {
            List<int> result = new List<int>();
            var subscriptions = await GetActivatedSubscription(modelId);
            if (subscriptions == null)
                return null;

            subscriptions.ToList().ForEach(x => x.FunctionalAccess.Split(";").ToList().ForEach(y => result.Add(int.Parse(y))));
            return result;
        }

        private async Task<IEnumerable<SubscriptionClientProto>> GetActivatedSubscription(int modelId) 
        {
            IEnumerable<SubscriptionClientProto> result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/subscription/get_activated_subscription/{modelId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<SubscriptionClientProto>>(json);
            }
            return result;
        }

        private async Task<IEnumerable<int>> GetDigitalModels()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return null;
            var user = await _userManager.FindByIdAsync(userId);

            string companyId = user.CompanyId.ToString();

            IEnumerable<ModelProto> result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/model/get_models/{companyId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<ModelProto>>(json);
            }
            return result.Select(x => x.Id);
        }
    }
}
