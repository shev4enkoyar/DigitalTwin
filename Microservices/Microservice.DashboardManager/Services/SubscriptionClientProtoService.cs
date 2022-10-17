using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Security.Claims;
using System;
using System.Threading.Tasks;
using Microservice.DashboardManager.Protos;

namespace Microservice.DashboardManager.Services
{
    public class SubscriptionClientProtoService : SubscriptionClientService.SubscriptionClientServiceBase
    {
        public IConfiguration Configuration { get; }

        public SubscriptionClientProtoService(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public override async Task GetActivatedClientSubscriptions(ActivatedClientSubscriptionsRequest request, IServerStreamWriter<SubscriptionsClientReply> responseStream, ServerCallContext context)
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            using var channel = GrpcChannel.ForAddress(
                Configuration.GetSection("gRPCConnections")["Micriservices.DashboardManager"],
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            SubscriptionsReply response = null;
            //TODO REDO
            using (var call = new SubscriptionService.SubscriptionServiceClient(channel).GetActivatedSubscriptions(new ActivatedSubscriptionsRequest { ModelId = request.ModelId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }

            var result = response.Subscriptions;

            SubscriptionsClientReply reply = new SubscriptionsClientReply();
            /*reply.Subscriptions.AddRange(result);*/
        }

        /* public override Task GetAllClientSubscriptions(AllClientSubscriptionsRequest request, IServerStreamWriter<SubscriptionsClientReply> responseStream, ServerCallContext context)
         {
             return base.GetAllClientSubscriptions(request, responseStream, context);
         }*/
    }
}
