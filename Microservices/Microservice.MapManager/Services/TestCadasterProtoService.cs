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
            if (Rosreestr.GetCoordinatesByCadastre(request.Cadaster) != null)
                return Task.FromResult(new TestCadasterReply() { Status = "ok" });

            return Task.FromResult(new TestCadasterReply() { Status = "error" });
        }
    }
}
