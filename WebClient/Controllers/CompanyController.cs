using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Data;
using WebClient.Hubs;
using WebClient.Interface;
using WebClient.Models;
using WebClient.Util;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/company")]
    public class CompanyController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _dbContext;
        private readonly IUserConnectionManager _userConnectionManager;
        private readonly NotificationHub _notificationHub;

        public CompanyController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager, IUserConnectionManager userConnectionManager, NotificationHub notificationHub)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _userConnectionManager = userConnectionManager;
            _notificationHub = notificationHub;
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

        [HttpGet("invite")]
        [Authorize(Roles = "Maintainer")]
        public async Task<IActionResult> CompanyInvite(string email, string rolesId)
        {
            // agrodigitaltwin.com/acceptingInvite/{id}?isAccept=true
            var currentUser = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var companyId = currentUser.CompanyId;
            if (companyId == null)
                return BadRequest("У Вас нет компании");

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return NotFound();

            if (user.CompanyId != null)
                return BadRequest("Данный пользователь уже зарегистрирован в другой компании");

            var companyInvite = new CompanyInvite { RolesId = rolesId, UserId = user.Id, CompanyId = (Guid)companyId };
            _dbContext.Add(companyInvite);
            _dbContext.SaveChanges();
            var notification = new Notification()
            {
                Message = $"Вас пригласили в компанию \"{currentUser.Company.CompanyName}\".{Environment.NewLine}" +
                $"Для того чтобы принять приглашение кликните по уведомлению.",
                Type = NotificationType.Question.ToString(),
                RedirectLink = $"acceptingInvite/{companyInvite.Id}",
                UserId = user.Id
            };
            _dbContext.Add(notification);
            _dbContext.SaveChanges();

            var connections = _userConnectionManager.GetUserConnections(user.Id);
            if (connections != null && connections.Count > 0)
            {
                foreach (var connectionId in connections)
                {
                    await _notificationHub.Clients.Client(connectionId).Recive(new Notification { });
                }
            }
            return Ok();
        }
    }
}
