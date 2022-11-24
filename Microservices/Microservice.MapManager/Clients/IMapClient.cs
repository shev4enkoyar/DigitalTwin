using System.Threading.Tasks;

namespace Microservice.MapManager.Clients
{
    public interface IMapClient
    {
        Task Recive(int id);
        Task ReciveIfCadaster(bool isCadaster);
    }
}
