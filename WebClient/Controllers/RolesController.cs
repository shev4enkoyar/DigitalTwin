using Grpc.Net.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebClient.Data;
using WebClient.Models;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/roles")]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly ApplicationDbContext _dbContext;

        public RolesController(ApplicationDbContext dbContext, RoleManager<ApplicationRole> roleManager)
        {
            _dbContext = dbContext;
            _roleManager = roleManager;
        }

        [HttpGet("get_all")]
        public async Task<string> GetAllRoles()
        {
            var roles = _roleManager.Roles.ToList();
            if (roles == null)
                return null;

            Dictionary<string, List<string>> rolePairs = new Dictionary<string, List<string>>();
            foreach (var role in roles)
            {
                List<string> functional = new List<string>(); 
                foreach (var item in role.FunctionalAccess.Split(';')) 
                {
                    string name = _dbContext.Functionals.FirstOrDefault(x => x.Id == int.Parse(item)).Name;
                    if(name == null)
                        functional.Add("");
                    functional.Add(name);
                }
                rolePairs.Add(role.NormalizedName, functional);
            }
            return JsonConvert.SerializeObject(rolePairs);
        }
    }
}
