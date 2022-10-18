using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using WebClient.Data;
using WebClient.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/company")]
    public class CompanyController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _dbContext;

        public CompanyController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }

        [HttpGet("create")]
        public async Task<IActionResult> CreateCompany(string name, string inn, string supervisorName, string contractId) 
        {
            if (_dbContext.Companies.Any(x => x.CompanyINN == inn))
            {
                return BadRequest("Company already exists!");
            }
            Company createdCompany = new Company()
            {
                CompanyName = name,
                CompanyINN = inn,
                SupervisorName = supervisorName,
                ContractId = contractId
            };

            await _dbContext.Companies.AddAsync(createdCompany);
            _dbContext.SaveChanges();
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            user.CompanyId = createdCompany.Id;
            await _userManager.UpdateAsync(user);
            return Ok();
        }

        [HttpGet("get_id")]
        public async Task<string> GetCompanyId()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            if (user.CompanyId.ToString() == null)
                return "0";
            
            return user.CompanyId.ToString();
        }
    }
}
