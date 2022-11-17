using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Models;
using WebClient.Util;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : CustomControllerBase
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ApplicationDbContext _dbContext;

        public RolesController(ApplicationDbContext dbContext, RoleManager<ApplicationRole> roleManager)
        {
            _dbContext = dbContext;
            _roleManager = roleManager;
        }

        [HttpGet("get_all")]
        public string GetAllRoles()
        {
            var roles = _roleManager.Roles.ToList();
            if (roles == null)
                return null;

            List<FullRoleModel> result = new List<FullRoleModel>();
            foreach (var role in roles)
            {
                List<string> functional = new List<string>();
                foreach (var item in role.FunctionalAccess.Split(';'))
                {
                    string name = _dbContext.Functionals.FirstOrDefault(x => x.Id == int.Parse(item)).Name;
                    if (name == null)
                        functional.Add("");
                    functional.Add(name);
                }
                result.Add(new FullRoleModel { Role = role, Functional = functional });
            }
            return JsonConvert.SerializeObject(result);
        }
    }
}
