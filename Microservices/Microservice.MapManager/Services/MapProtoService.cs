using Grpc.Core;
using Microservice.MapManager.DAL;
using Microservice.MapManager.DAL.Models;
using Microservice.MapManager.Protos;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using TestReestr.Scripts.rosreestr2coord;

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
            var mapId = _dbContext.Maps.Any(x => x.ModelId == request.ModelId)
                ? _dbContext.Maps.FirstOrDefault(x => x.ModelId == request.ModelId)!.Id
                : CreateMap(request);

            return Task.FromResult(new GetMapIdReply
            {
                MapId = mapId,
            });
        }
        public override Task<GetMapCenterReply> GetMapCenter(GetMapCenterRequest request, ServerCallContext context)
        {
            var map = _dbContext.Maps.Include(x => x.Figures).FirstOrDefault(x => x.ModelId == request.ModelId);
            if (map == null)
                return Task.FromResult(new GetMapCenterReply());

            var figure = map.Figures.FirstOrDefault();
            if (figure == null)
                return Task.FromResult(new GetMapCenterReply());

            var points = figure.Points.Split(',');

            return Task.FromResult(new GetMapCenterReply() { Lat = double.Parse(points[0]), Lng = double.Parse(points[1]) });

        }

        private int CreateMap(GetMapIdRequest request)
        {
            var map = new Map
            {
                ModelId = request.ModelId
            };
            _dbContext.Add(map);
            _dbContext.SaveChanges();

            if (request.Cadaster == null || request.Cadaster.Equals(""))
                return map.Id;
            var cadastreFigure = new Figure
            {
                MapId = map.Id,
                Points = Rosreestr.GetCoordinatesByCadastre(request.Cadaster),
                CategoryId = _dbContext.FigureCategories.FirstOrDefault(x => x.FigureType.Type.Equals("polygon"))!.Id
            };

            _dbContext.Figures.Add(cadastreFigure);
            map.Cadaster = request.Cadaster;
            _dbContext.Update(map);
            _dbContext.SaveChanges();
            return map.Id;
        }

        public override Task<GetMapAreaReply> GetMapArea(GetMapAreaRequest request, ServerCallContext context)
        {
            var map = _dbContext.Maps.FirstOrDefault(x => x.ModelId == request.ModelId);
            return Task.FromResult(map == null
                ? new GetMapAreaReply { Area = 0 }
                : new GetMapAreaReply { Area = double.Parse(map.ProductArea) });
        }
    }
}