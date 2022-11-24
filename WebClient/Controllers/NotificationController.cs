using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Models;

namespace WebClient.Controllers
{
    /// <summary>
    /// User notification management controller
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : CustomControllerBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public NotificationController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        /// <summary>
        /// User Notification Receive Method
        /// </summary>
        /// <returns>Notification object</returns>
        [HttpGet("get_all")]
        public string GetUserNotifications()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IEnumerable<Notification> notifications = _dbContext.Notifications.Where(x => x.UserId == userId).ToList();
            return JsonConvert.SerializeObject(notifications);
        }
    }
}
