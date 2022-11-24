using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Clients;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Hubs;
using WebClient.Interface;
using WebClient.Models;
using WebClient.Util;

namespace WebClient.Controllers
{
    /// <summary>
    /// Company management controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CompanyController : CustomControllerBase
    {
        /// <summary>
        /// User management property
        /// </summary>
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// Role management property
        /// </summary>
        private readonly RoleManager<ApplicationRole> _roleManager;

        /// <summary>
        /// Database access property
        /// </summary>
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// SignalR connection
        /// </summary>
        private readonly IUserConnectionManager _userConnectionManager;

        /// <summary>
        /// SignalR hub for notification
        /// </summary>
        private readonly IHubContext<NotificationHub, INotificationClient> _notificationHub;

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public CompanyController(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager, IUserConnectionManager userConnectionManager, IHubContext<NotificationHub, INotificationClient> notificationHub, RoleManager<ApplicationRole> roleManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _userConnectionManager = userConnectionManager;
            _notificationHub = notificationHub;
            _roleManager = roleManager;
        }

        /// <summary>
        /// Company Formation Method
        /// </summary>
        /// <param name="name">Company name</param>
        /// <param name="inn">Company Inn</param>
        /// <param name="supervisorName">Supervisor name</param>
        /// <param name="contractId">contract num</param>
        /// <returns>Status 200 if successful, otherwise 400</returns>
        [HttpGet("create")]
        public async Task<IActionResult> CreateCompany(string name, string inn, string supervisorName, string contractId)
        {
            if (_dbContext.Companies.Any(x => x.CompanyInn == inn))
            {
                return BadRequest("Company already exists!");
            }
            var createdCompany = new Company()
            {
                CompanyName = name,
                CompanyInn = inn,
                SupervisorName = supervisorName,
                ContractId = contractId
            };

            await _dbContext.Companies.AddAsync(createdCompany);
            await _dbContext.SaveChangesAsync();
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            user.CompanyId = createdCompany.Id;
            await _userManager.UpdateAsync(user);
            return Ok();
        }

        /// <summary>
        /// Method for getting current user's company
        /// </summary>
        /// <returns>Company Id</returns>
        [HttpGet("get_id")]
        public async Task<string> GetCompanyId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);
            return user.CompanyId.ToString();
        }

        /// <summary>
        /// Method for inviting a user to a company
        /// </summary>
        /// <param name="email">User email</param>
        /// <param name="rolesId">Roles Id</param>
        /// <returns>Status 200 if successful</returns>
        [HttpGet("invite")]
        public async Task<IActionResult> CompanyInvite(string email, string rolesId)
        {
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
            await _dbContext.SaveChangesAsync();
            var notification = new Notification()
            {
                Message = $"Вас пригласили в компанию \"{(await _dbContext.Companies.FindAsync(currentUser.CompanyId)).CompanyName}\".{Environment.NewLine}" +
                $"Для того чтобы принять приглашение кликните по уведомлению.",
                Type = NotificationTypesEnum.Invite,
                RedirectLink = $"api/company/acceptingInvite/{companyInvite.Id}?isAccept=true;api/company/acceptingInvite/{companyInvite.Id}?isAccept=false",
                UserId = user.Id
            };
            _dbContext.Add(notification);
            await _dbContext.SaveChangesAsync();

            var connections = _userConnectionManager.GetUserConnections(user.Id);
            if (connections == null || connections.Count <= 0) return Ok();
            foreach (var connectionId in connections)
            {
                await _notificationHub.Clients.Client(connectionId).Recive(new Notification());
            }
            return Ok();
        }

        /// <summary>
        /// Method of accepting an invitation to a company
        /// </summary>
        /// <param name="id">Invite Id</param>
        /// <param name="isAccept">Acceptance or Rejection</param>
        /// <returns>Status 200 if successful</returns>
        [HttpGet("acceptingInvite/{id}")]
        public async Task<IActionResult> AcceptingInvite(int id, bool isAccept)
        {
            var invite = await _dbContext.CompanyInvites.FindAsync(id);
            if (invite == null)
                return BadRequest("Прилашение не найдено");
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!isAccept) return Ok();
            var user = await _userManager.FindByIdAsync(userId);
            user.CompanyId = invite.CompanyId;

            var rolesId = invite.RolesId.Split(";")
                .Where(item => !string.IsNullOrEmpty(item))
                .ToList();

            var roles = rolesId.Select(x => _roleManager.FindByIdAsync(x).Result.Name);
            await _userManager.AddToRolesAsync(user, roles);
            _dbContext.Update(user);
            _dbContext.RemoveRange(_dbContext.CompanyInvites.Where(x => x.UserId.Equals(userId)));
            _dbContext.RemoveRange(_dbContext.Notifications.Where(x => (x.UserId.Equals(userId)) && (x.Type.Equals(NotificationTypesEnum.Invite))));
            await _dbContext.SaveChangesAsync();
            return Ok();
        }
    }
}
