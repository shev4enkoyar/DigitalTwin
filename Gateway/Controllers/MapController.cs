using Grpc.Net.Client;
using Microservice.MapManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        [HttpGet("get_area/{modelId}")]
        public async Task<double> ValidateCadasterAsync(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Map,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );

            var client = new MapService.MapServiceClient(channel);
            var reply = await client.GetMapAreaAsync(new GetMapAreaRequest{ ModelId = modelId });

            return reply.Area;
        }
    }
}
