using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Models;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/functional")]
    public class FunctionalController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public FunctionalController(UserManager<ApplicationUser> userManage)
        {
            _userManager = userManage;
        }

        [HttpGet("get_all")]
        public async Task<IEnumerable<string>> GetFunctional()
        {
            List<string> functions = new List<string>() { "models", "createModel" };
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user.CompanyId == null)
                functions.Add("registerCompany");
            return functions;
        }
    }
}
