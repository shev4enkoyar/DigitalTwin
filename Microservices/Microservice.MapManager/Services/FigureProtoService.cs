using Grpc.Core;
using Microservice.MapManager.DAL;
using Microservice.MapManager.Protos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.MapManager.Services
{
    public class FigureProtoService : FigureService.FigureServiceBase
    {
        private readonly ApplicationContext _dbContext;

        public FigureProtoService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }
        public override async Task GetFigures(SendRequest request, IServerStreamWriter<SendReply> responseStream, ServerCallContext context)
        {
            var sendReply = new SendReply();
            sendReply.Figures.AddRange(GetProtoFigures(request.MapId));
            await responseStream.WriteAsync(sendReply);
            await Task.FromResult(sendReply);
        }

        private IEnumerable<FigureProto> GetProtoFigures(int mapId)
        {
            return _dbContext.Figures
                .Include(x => x.FigureCategory)
                .Include(x => x.FigureCategory.Color)
                .Include(x => x.FigureCategory.FigureType)
                .Where(x => x.MapId == mapId)
                .Select(x => new FigureProto()
                {
                    Id = x.Id,
                    MapId = x.MapId,
                    CategoryId = x.CategoryId,
                    Points = x.Points,
                    Color = x.FigureCategory.Color.HEX,
                    Type = x.FigureCategory.FigureType.Type,
                    IsUnique = x.FigureCategory.IsUnique
                });
        }
    }
}
