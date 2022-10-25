using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Data;
using WebClient.Models;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/notification")]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public NotificationController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("get_all")]
        public async Task<string> GetUserNotifications()
        {
            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            IEnumerable<Notification> notifications = _dbContext.Notifications.Where(x => x.UserId == userId).ToList();
            return JsonConvert.SerializeObject(notifications);
        }
    }
}
