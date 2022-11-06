using Grpc.Net.Client;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Shared;
using System.Net.Http;
using System.Threading.Tasks;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class CadasterController : ControllerBase
    {
        public IConfiguration Configuration { get; }

        public CadasterController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet("validate/{cadaster}")]
        public async Task<IActionResult> ValidateCadaster(string cadaster)
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Map,
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            var client = new CadasterService.CadasterServiceClient(channel);
            var reply = await client.TestCadasterAsync(new TestCadasterRequest
            {
                Cadaster = cadaster
            });
            if (reply.Status.Equals("ok"))
                return Ok();
            return NotFound();
        }
    }
}
