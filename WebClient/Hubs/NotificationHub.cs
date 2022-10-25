using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using WebClient.Clients;
using WebClient.Interface;

namespace WebClient.Hubs
{
    /*
     Use example
     [HttpPost]
            public async Task<ActionResult> SendToSpecificUser(Article model)
            {
                var connections = _userConnectionManager.GetUserConnections(userId);
                if (connections != null && connections.Count > 0)
                {
                    foreach (var connectionId in connections)
                    {
                        await _notificationUserHubContext.Clients.Client(connectionId).SendAsync("Recive", notification);
                    }
                }
                return View();
            }
    */
    public class NotificationHub : Hub<INotificationClient>
    {
        private IUserConnectionManager _userConnectionManager;
        public NotificationHub(IUserConnectionManager userConnectionManager)
        {
            _userConnectionManager = userConnectionManager;
        }
        public string GetConnectionId()
        {
            var httpContext = this.Context.GetHttpContext();
            var userId = httpContext.Request.Query["userId"];
            _userConnectionManager.KeepUserConnection(userId, Context.ConnectionId);

            return Context.ConnectionId;
        }

        public async override Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            _userConnectionManager.RemoveUserConnection(connectionId);
            _ = await Task.FromResult(0);
        }
    }
}
