using Grpc.Core;
using Microservice.DashboardManager.DAL;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    public class TransportProtoService : TransportService.TransportServiceBase
    {
        private ApplicationContext DbContext { get; }

        public TransportProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        public override async Task GetAllTransport(GetAllTransportRequest request, IServerStreamWriter<GetAllTransportReply> responseStream, ServerCallContext context)
        {
            GetAllTransportReply transportReply = new GetAllTransportReply();
            transportReply.Transports.AddRange(GetProtoTransport());

            await responseStream.WriteAsync(transportReply);
            await Task.FromResult(transportReply);
        }

        private IEnumerable<TransportProto> GetProtoTransport()
        {
            return DbContext.Transports
                .Select(x => new TransportProto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Brand = x.Brand,
                    Staff = x.Staff
                });
        }
    }
}
