using Grpc.Core;
using Microservice.MapManager.Protos;
using System.Threading.Tasks;
using TestReestr.Scripts.rosreestr2coord;

namespace Microservice.MapManager.Services
{
    /// <summary>
    /// GRPS service for checking the cadastral number
    /// </summary>
    public class TestCadasterProtoService : CadasterService.CadasterServiceBase
    {
        /// <summary>
        /// Сadastral number verification method
        /// </summary>
        /// <returns>Method execution status</returns>
        public override Task<TestCadasterReply> TestCadaster(TestCadasterRequest request, ServerCallContext context)
        {
            return Task.FromResult(Rosreestr.GetCoordinatesByCadastre(request.Cadaster) != null 
                ? new TestCadasterReply { Status = "ok" } 
                : new TestCadasterReply { Status = "error" });
        }
    }
}
