using Grpc.Core;
using Microservice.SubscriptionManager.DAL;
using Microservice.SubscriptionManager.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.SubscriptionManager.Services
{
    public class SubscriptionProtoService : SubscriptionService.SubscriptionServiceBase
    {
        private ApplicationContext DbContext { get; }

        public SubscriptionProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
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

        public override Task<AddSubscriptionReply> AddSubscription(AddSubscriptionRequest request, ServerCallContext context)
        {
            DbContext.Add(new ActivatedSubscription
            {
                ModelId = request.ModelId,
                SubscriptionId = request.SubscriptionId,
                ActivatedData = DateTime.ParseExact(request.ActivatedData, "dd.MM.yyyy", CultureInfo.InvariantCulture),
                ExpirationData = DateTime.ParseExact(request.ExpirationData, "dd.MM.yyyy", CultureInfo.InvariantCulture)
            });
            DbContext.SaveChanges();

            return Task.FromResult(new AddSubscriptionReply { Status = "ok" });
        }

        public override Task<UpdateSubscriptionReply> UpdateSubscription(UpdateSubscriptionRequest request, ServerCallContext context)
        {
            ActivatedSubscription subscription = DbContext.ActivatedSubscriptions.FirstOrDefault(x => x.Id == request.ActivatedSubscriptionId);
            if (subscription == null)
                return Task.FromResult(new UpdateSubscriptionReply { Status = "no such subscription" });
            subscription.ExpirationData = subscription.ExpirationData.AddDays(request.Days);
            DbContext.Update(subscription);

            return Task.FromResult(new UpdateSubscriptionReply { Status = "ok" });
        }

        private IEnumerable<SubscriptionProto> GetProtoSubscriptions(int modelId)
        {
            return DbContext.ActivatedSubscriptions
                .Include(x => x.Subscription)
                .Where(x => x.ModelId.Equals(modelId))
                .Select(x => new SubscriptionProto()
                {
                    Id = x.Id,
                    Name = x.Subscription.Name,
                    Price = x.Subscription.Price.ToString(),
                    FunctionalAccess = x.Subscription.FunctionalAccess
                })
                .ToList();
        }

        private IEnumerable<SubscriptionProto> GetProtoSubscriptions()
        {
            return DbContext.Subscriptions
                .Select(x => new SubscriptionProto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Price = x.Price.ToString(),
                    FunctionalAccess = x.FunctionalAccess
                })
                .ToList();
        }
    }
}
