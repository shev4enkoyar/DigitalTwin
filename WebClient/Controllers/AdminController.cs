using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Models;

namespace WebClient.Controllers
{
    //[Authorize(Roles = "ADMIN")]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : CustomControllerBase
    {
        private ApplicationDbContext DbContext { get; }

        private RoleManager<ApplicationRole> RoleManager { get; }

        public AdminController(ApplicationDbContext dbContext, RoleManager<ApplicationRole> roleManager)
        {
            DbContext = dbContext;
            RoleManager = roleManager;
        }

        #region Identity manipulations

        #region Get

        [HttpGet("get_users")]
        public IEnumerable<dynamic> GetUsers()
        {
            return DbContext.Users
                .Include(x => x.Company)
                .Select(x => new
                {
                    x.Id,
                    x.CompanyId,
                    x.Company.CompanyName,
                    x.Email,
                    x.EmailConfirmed,
                    x.PhoneNumber,
                    x.PhoneNumberConfirmed,
                    x.LockoutEnabled,
                    x.LockoutEnd
                });
        }

        [HttpGet("get_user/{userId}")]
        public dynamic GetUser(string userId)
        {
            return DbContext.Users
                .Include(x => x.Company)
                .Select(x => new
                {
                    x.Id,
                    x.CompanyId,
                    x.Company.CompanyName,
                    x.Email,
                    x.EmailConfirmed,
                    x.PhoneNumber,
                    x.PhoneNumberConfirmed,
                    x.LockoutEnabled,
                    x.LockoutEnd
                })
                .FirstOrDefault(x => x.Id.Equals(userId));
        }

        [HttpGet("get_user_roles/{userId}")]
        public IEnumerable<dynamic> GetUserRoles(string userId)
        {
            return DbContext.UserRoles
                .Where(x => x.UserId.Equals(userId))
                .Select(x => DbContext.Roles
                    .FirstOrDefault(y => y.Id.Equals(x.RoleId)));
        }

        [HttpGet("get_roles")]
        public IEnumerable<dynamic> GetRoles()
        {
            return DbContext.Roles;
        }

        [HttpGet("get_functionals")]
        public IEnumerable<dynamic> GetFunctionals()
        {
            return DbContext.Functionals;
        }

        [HttpGet("get_companies")]
        public IEnumerable<dynamic> GetCompanies()
        {
            return DbContext.Companies;
        }

        #endregion

        #region Edit

        [HttpGet("edit_functional/{functionalId:int}")]
        public async Task<IActionResult> EditFunctional(int functionalId,
            string name = null,
            string description = null)
        {
            var functional = DbContext.Functionals.FirstOrDefault(x => x.Id.Equals(functionalId));

            if (functional == null)
                return BadRequest("Functional not exists!");

            if (name != null)
                functional.Name = name;

            if (description != null)
                functional.Description = description;

            DbContext.Functionals.Update(functional);
            await DbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpGet("edit_company/{companyId}")]
        public async Task<IActionResult> EditCompany(string companyId,
            string companyName = null,
            string companyInn = null,
            string supervisorName = null,
            string contractId = null)
        {
            var company = DbContext.Companies.FirstOrDefault(x => x.ContractId.Equals(companyId));

            if (company == null)
                return BadRequest("Company not exists!");

            if (companyName != null)
                company.CompanyName = companyName;

            if (companyInn != null)
                company.CompanyInn = companyInn;

            if (supervisorName != null)
                company.SupervisorName = supervisorName;

            if (contractId != null)
                company.ContractId = contractId;

            DbContext.Companies.Update(company);
            await DbContext.SaveChangesAsync();

            return Ok();
        }

        #endregion

        #endregion

        #region Dashboard manipulations

        //TODO UNCOMPLETED
        [HttpGet("getDashboards")]
        public async Task<string> GetDashboards()
        {
            var response = await ConnectionClient.GetAsync("api/admin/getDashboards");

            if (response.IsSuccessStatusCode)
                return await response.Content.ReadAsStringAsync();
            return null;
        }

        #endregion
    }
}
