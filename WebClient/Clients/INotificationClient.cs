using System.Threading.Tasks;
using WebClient.Models;

namespace WebClient.Clients
{
    public interface INotificationClient
    {
        Task Recive(Notification notification);
    }
}
