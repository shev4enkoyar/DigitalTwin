using Grpc.Core;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using Shared;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

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

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.DockerServices.Subscription,
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            SubscriptionsReply response = null;

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

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.DockerServices.Subscription,
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            SubscriptionsReply response = null;

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

        public override Task<AddClientSubscriptionReply> AddClientSubscription(AddClientSubscriptionRequest request, ServerCallContext context)
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.DockerServices.Subscription,
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            var client = new SubscriptionService.SubscriptionServiceClient(channel);
            var reply = client.AddSubscription(new AddSubscriptionRequest
            {
                ActivatedData = request.ActivatedData,
                ExpirationData = request.ExpirationData,
                SubscriptionId = request.SubscriptionId,
                ModelId = request.ModelId
            });

            return Task.FromResult(new AddClientSubscriptionReply { Status = reply.Status });
        }

        public override Task<UpdateClientSubscriptionReply> UpdateClientSubscription(UpdateClientSubscriptionRequest request, ServerCallContext context)
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.DockerServices.Subscription,
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            var client = new SubscriptionService.SubscriptionServiceClient(channel);
            var reply = client.UpdateSubscription(new UpdateSubscriptionRequest
            {
                ActivatedSubscriptionId = request.ActivatedSubscriptionId,
                Days = request.Days
            });

            return Task.FromResult(new UpdateClientSubscriptionReply { Status = reply.Status });

        }

    }

}
