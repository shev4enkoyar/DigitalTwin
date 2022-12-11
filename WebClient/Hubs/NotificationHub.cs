using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using WebClient.Clients;
using WebClient.Interface;

namespace WebClient.Hubs
{
    public class NotificationHub : Hub<INotificationClient>
    {
        private readonly IUserConnectionManager _userConnectionManager;
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

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            _userConnectionManager.RemoveUserConnection(connectionId);
            _ = await Task.FromResult(0);
        }
    }
}
