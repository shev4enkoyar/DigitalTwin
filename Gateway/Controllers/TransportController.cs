using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    /// <summary>
    /// Vehicle Interaction Controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class TransportController : ControllerBase
    {
        /// <summary>
        /// Getting all vehicles on a specific model
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <returns>Enumeration of transport objects</returns>
        [HttpGet("get_all")]
        public async Task<IEnumerable<TransportProto>> GetAllByModelId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );

            GetAllTransportReply response = null;
            using (var call = new TransportService.TransportServiceClient(channel)
                .GetAllTransport(new GetAllTransportRequest()))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            return response?.Transports;
        }

        /// <summary>
        /// Method for getting transport by its Id
        /// </summary>
        /// <param name="transportId">Transport Id</param>
        /// <returns>Transport model</returns>
        [HttpGet("get_by_id/{transportId:int}")]
        public async Task<TransportProto> GetTransportyId(int transportId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );
            var client = new TransportService.TransportServiceClient(channel);
            var reply = await client.GetTransportByIdAsync(new GetTransportByIdRequest { Id = transportId });
            return reply.Transport;
        }

    }
}
