using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Security.Claims;
using System;
using System.Threading.Tasks;
using Microservice.DashboardManager.Protos;
using System.Collections;
using System.Linq;
using Microservice.SubscriptionManager;

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
                Configuration.GetSection("gRPCConnections")["Micriservices.SubscriptionManager"],
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
            var list = result.Select(x => new SubscriptionClientProto
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                FunctionalAccess = x.FunctionalAccess
            });
            SubscriptionsClientReply reply = new SubscriptionsClientReply();
            reply.Subscriptions.AddRange(list);
            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        public override async Task GetAllClientSubscriptions(AllClientSubscriptionsRequest request, IServerStreamWriter<SubscriptionsClientReply> responseStream, ServerCallContext context)
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            using var channel = GrpcChannel.ForAddress(
                Configuration.GetSection("gRPCConnections")["Micriservices.SubscriptionManager"],
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            SubscriptionsReply response = null;
            //TODO REDO
            using (var call = new SubscriptionService.SubscriptionServiceClient(channel).GetAllSubscriptions(new AllSubscriptionsRequest()))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }

            var result = response.Subscriptions;
            var list = result.Select(x => new SubscriptionClientProto
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
                FunctionalAccess = x.FunctionalAccess
            });
            SubscriptionsClientReply reply = new SubscriptionsClientReply();
            reply.Subscriptions.AddRange(list);
            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }
    }

}
