using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Models;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    /// <summary>
    /// User Role Controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RolesController : CustomControllerBase
    {
        /// <summary>
        /// Role management property
        /// </summary>
        private readonly RoleManager<ApplicationRole> _roleManager;

        /// <summary>
        /// Database access property
        /// </summary>
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public RolesController(ApplicationDbContext dbContext, RoleManager<ApplicationRole> roleManager)
        {
            _dbContext = dbContext;
            _roleManager = roleManager;
        }

        /// <summary>
        /// Method for getting all roles
        /// </summary>
        /// <returns>Enumeration of roles and functionality</returns>
        [HttpGet("get_all")]
        public string GetAllRoles()
        {
            var roles = _roleManager.Roles.ToList();

            var result = new List<FullRoleModel>();
            foreach (var role in roles)
            {
                var functional = new List<string>();
                foreach (var item in role.FunctionalAccess.Split(';'))
                {
                    var name = _dbContext.Functionals.FirstOrDefault(x => x.Id == int.Parse(item))?.Name;
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
