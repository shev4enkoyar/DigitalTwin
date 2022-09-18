using Microservice.MapManager.DAL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Microservice.MapManager.Clients
{
    public interface IMapClient
    {
        Task Recive(MapInitData mapInitData);
        Task Recive(string v);
        Task Recive(List<FigureCategory> categories);
        Task Recive(List<Figure> figures);
        Task Recive(FigureCategory figureCategory);
        Task Recive(List<FigureInfo> figureInfos);
        Task Recive(FigureInfo figureInfo);
    }
}
