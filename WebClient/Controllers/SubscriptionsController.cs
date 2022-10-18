using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager;
using Microservice.DashboardManager.Protos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Models;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/subscriptions")]
    public class SubscriptionsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public IConfiguration Configuration { get; }

        public SubscriptionsController(IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            Configuration = configuration;
            _userManager = userManager;
        }

        [HttpGet("get_all")]
        public async Task<IEnumerable<SubscriptionClientProto>> GetAllSubscriptions() 
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            using var channel = GrpcChannel.ForAddress(
                Configuration.GetSection("gRPCConnections")["Micriservices.DashboardManager"],
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            SubscriptionsClientReply response = null;
            //TODO REDO
            using (var call = new SubscriptionClientService.SubscriptionClientServiceClient(channel).GetAllClientSubscriptions(new AllClientSubscriptionsRequest()))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            return response.Subscriptions;
        }

        [HttpGet("get_all_by_company")]
        public async Task<string> GetAllSubscriptionsByCompany()
        {
            var models = GetAllModelsAsync().Result;
            if (models == null)
                return null;

            //TODO REDO
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };
            
            using var channel = GrpcChannel.ForAddress(
                Configuration.GetSection("gRPCConnections")["Micriservices.DashboardManager"],
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            Dictionary<string, List<string>> modelSubscriptions = new Dictionary<string, List<string>>();
            foreach (var model in models)
            {
                SubscriptionsClientReply response = null;
                using (var call = new SubscriptionClientService.SubscriptionClientServiceClient(channel).GetActivatedClientSubscriptions(new ActivatedClientSubscriptionsRequest { ModelId = model.Id }))
                {
                    while (await call.ResponseStream.MoveNext())
                    {
                        response = call.ResponseStream.Current;
                    }
                }
                List<string> subscriptions = new List<string>();
                foreach (var item in response.Subscriptions)
                {
                    subscriptions.Add(item.Name);
                }
                modelSubscriptions.Add(model.Name, subscriptions);
            }
            return JsonConvert.SerializeObject(modelSubscriptions);
        }

        private async Task<IEnumerable<ModelProto>> GetAllModelsAsync() {

            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null || user.CompanyId.ToString() == null)
                return null;

            using var channel = GrpcChannel.ForAddress(
                Configuration.GetSection("gRPCConnections")["Micriservices.DashboardManager"],
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            GetModelsReply response = null;
            //TODO REDO
            using (var call = new DigitalModelService.DigitalModelServiceClient(channel).GetDigitalModels(new GetModelsRequest { CompanyId = user.CompanyId.ToString() }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    Console.WriteLine(call.ResponseStream.Current.Models);
                    response = call.ResponseStream.Current;
                }
            }
            return response.Models;
        }
    }
}