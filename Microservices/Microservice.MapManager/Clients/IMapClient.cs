using Microservice.MapManager.DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Microservice.MapManager.Clients
{
    public interface IMapClient
    {
        Task Recive(int id);
        Task ReciveIfCadaster(bool isCadaster);
    }
}
