using Grpc.Core;
using Microservice.MapManager.DAL;
using Microservice.MapManager.DAL.Models;
using Microservice.MapManager.Protos;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.MapManager.Services
{
    public class MapProtoService : MapService.MapServiceBase
    {
        private readonly ApplicationContext _dbContext;

        public MapProtoService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override Task<GetMapIdReply> GetMapId(GetMapIdRequest request, ServerCallContext context)
        {
            int mapId = -1;
            if (_dbContext.Maps.Any(x => x.ModelId == request.ModelId))
            {
                mapId = _dbContext.Maps.Where(x => x.ModelId == request.ModelId).FirstOrDefault().Id;
            }
            else
            {
                var map = new Map();
                map.ModelId = request.ModelId;
                _dbContext.Add(map);
                _dbContext.SaveChanges();
                mapId = map.Id;
            }
            return Task.FromResult(new GetMapIdReply
            {
                MapId = mapId,
            });
        }

        
    }
}
