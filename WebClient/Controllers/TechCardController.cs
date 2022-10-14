using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
using Microservice.WebClient.Protos;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Grpc.Core;
using System.Threading.Tasks;
using System.Net.Http;

namespace WebClient.Controllers
{
    [Authorize]
    [Route("api/techcard")]
    public class TechCardController : ControllerBase
    {
        public IConfiguration Configuration { get; }

        public TechCardController(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        [HttpGet]
        public async Task<IEnumerable<ModelProto>> Get()
        {
            var httpHandler = new HttpClientHandler();
            httpHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            using var channel = GrpcChannel.ForAddress(Configuration.GetSection("gRPCConnections")["Micriservices.DashboardManager"], new GrpcChannelOptions { HttpHandler = httpHandler });
            var client = new DigitalModelService.DigitalModelServiceClient(channel);
           
            using var call = client.GetDigitalModels(new GetModelsRequest { UserId = userId });
            GetModelsReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                Console.WriteLine(call.ResponseStream.Current.Models);
                response = call.ResponseStream.Current;
            }
            return response.Models;
        }
    }
}
