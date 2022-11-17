﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Models;

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
            var roles = userRoles.Select(x => _roleManager.FindByIdAsync(x.RoleId).Result).ToList();

            List<string> functions = new List<string>();
            foreach (var item in roles)
                foreach (var functionId in item.FunctionalAccess.Split(";"))
                    if (!string.IsNullOrEmpty(functionId))
                        functions.Add(_dbContext.Functionals.Where(x => x.Id == int.Parse(functionId)).FirstOrDefault().Name);

            return functions;
        }
    }
}
