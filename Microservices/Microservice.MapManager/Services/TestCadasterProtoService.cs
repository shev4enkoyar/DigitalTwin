using Grpc.Core;
using Microservice.MapManager.Protos;
using System.Threading.Tasks;
using TestReestr.Scripts.rosreestr2coord;

namespace Microservice.MapManager.Services
{
    public class TestCadasterProtoService : CadasterService.CadasterServiceBase
    {
        public override Task<TestCadasterReply> TestCadaster(TestCadasterRequest request, ServerCallContext context)
        {
            return Task.FromResult(Rosreestr.GetCoordinatesByCadastre(request.Cadaster) != null 
                ? new TestCadasterReply { Status = "ok" } 
                : new TestCadasterReply { Status = "error" });
        }
    }
}
