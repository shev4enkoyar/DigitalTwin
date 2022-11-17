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
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : CustomControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public NotificationController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("get_all")]
        public string GetUserNotifications()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IEnumerable<Notification> notifications = _dbContext.Notifications.Where(x => x.UserId == userId).ToList();
            return JsonConvert.SerializeObject(notifications);
        }
    }
}
