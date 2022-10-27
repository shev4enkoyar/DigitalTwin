using Grpc.Core;
using Microservice.MapManager.DAL;
using Microservice.MapManager.DAL.Models;
using Microservice.MapManager.Protos;
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
            int mapId = -1;
            if (_dbContext.Maps.Any(x => x.ModelId == request.ModelId))
                mapId = _dbContext.Maps.Where(x => x.ModelId == request.ModelId).FirstOrDefault().Id;
            else
                mapId = CreateMap(request);

            return Task.FromResult(new GetMapIdReply
            {
                MapId = mapId,
            });
        }

        private int CreateMap(GetMapIdRequest request)
        {
            Map map = new Map
            {
                ModelId = request.ModelId
            };

            _dbContext.Add(map);
            _dbContext.SaveChanges();

            if (request.Cadaster != null && !request.Cadaster.Equals(""))
            {
                Figure cadastreFigure = new Figure()
                {
                    MapId = map.Id,
                    Points = Rosreestr.GetCoordinatesByCadastre(request.Cadaster),
                    CategoryId = _dbContext.FigureCategories.FirstOrDefault(x => x.Name.Equals(request.CategoryName)).Id
                };

                _dbContext.Figures.Add(cadastreFigure);
                _dbContext.SaveChanges();
            }
            return map.Id;
        }
    }
}

//TODO Example proto
/* PROTO greet.proto
syntax = "proto3";

option csharp_namespace = "WebGateway";

package greet;

// The greeting service definition.
service Greeter
{
    // Sends a greeting
    rpc SayHello (HelloRequest) returns (HelloReply);
}

// The request message containing the user's name.
message HelloRequest
{
  string name = 1;
}

// The response message containing the greetings.
message HelloReply
{
  string message = 1;
}
*/

/* GreeterService
 * private readonly ILogger<GreeterService> _logger;
        public GreeterService(ILogger<GreeterService> logger)
        {
            _logger = logger;
        }

        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            return Task.FromResult(new HelloReply
            {
                Message = "Hello " + request.Name
            });
        }*/
