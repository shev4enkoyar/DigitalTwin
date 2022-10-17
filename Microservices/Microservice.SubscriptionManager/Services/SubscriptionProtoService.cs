using Grpc.Core;
using Microservice.SubscriptionManager.DAL;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.SubscriptionManager.Services
{
    public class SubscriptionProtoService : SubscriptionService.SubscriptionServiceBase
    {
        private readonly ApplicationContext _dbContext;

        public SubscriptionProtoService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task GetAllSubscriptions(AllSubscriptionsRequest request, IServerStreamWriter<SubscriptionsReply> responseStream, ServerCallContext context)
        {

            SubscriptionsReply subscriptionsReply = new SubscriptionsReply();
            subscriptionsReply.Subscriptions.AddRange(GetProtoSubscriptions());
            await responseStream.WriteAsync(subscriptionsReply);
            await Task.FromResult(subscriptionsReply);
        }

        public override async Task GetActivatedSubscriptions(ActivatedSubscriptionsRequest request, IServerStreamWriter<SubscriptionsReply> responseStream, ServerCallContext context)
        {
            SubscriptionsReply subscriptionsReply = new SubscriptionsReply();
            subscriptionsReply.Subscriptions.AddRange(GetProtoSubscriptions(request.ModelId));
            await responseStream.WriteAsync(subscriptionsReply);
            await Task.FromResult(subscriptionsReply);
        }

        private IEnumerable<SubscriptionProto> GetProtoSubscriptions(int modelId)
        {
            var temp = _dbContext.ActivatedSubscriptions.Include(x => x.Subscription).ToList();
            var result = temp.Where(x => x.ModelId == modelId)
                                .Select(x => new SubscriptionProto()
                                {
                                    Id = x.Id,
                                    Name = x.Subscription.Name,
                                    Price = x.Subscription.Price.ToString()
                                })
                                .ToList();
            return result;

        }

        private IEnumerable<SubscriptionProto> GetProtoSubscriptions()
        {
            var temp = _dbContext.Subscriptions.ToList();
            var result = temp
                            .Select(x => new SubscriptionProto()
                            {
                                Id = x.Id,
                                Name = x.Name,
                                Price = x.Price.ToString()
                            })
                            .ToList();
            return result;

        }
    }
}
