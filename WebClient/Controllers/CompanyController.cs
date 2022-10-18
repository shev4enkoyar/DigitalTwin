using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;
using WebClient.Data;
using WebClient.Models;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/company")]
    public class CompanyController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CompanyController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
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
            return Ok();
        }
    }
}
