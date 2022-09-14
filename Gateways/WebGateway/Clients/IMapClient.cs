using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;
using WebGateway.Models;

namespace WebGateway.Clients
{
    public interface IMapClient
    {
        Task ReciveFiguresInfos(List<FigureInfo> figureInfos);
    }
}
