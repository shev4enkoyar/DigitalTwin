using Grpc.Core;
using Microservice.SubscriptionManager.DAL;
using Microservice.SubscriptionManager.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public override Task<AddSubscriptionReply> AddSubscription(AddSubscriptionRequest request, ServerCallContext context)
        {
            _dbContext.Add(new ActivatedSubscription 
            { 
                ModelId = request.ModelId, 
                SubscriptionId = request.SubscriptionId,
                ActivatedData = DateTime.Parse(request.ActivatedData),
                ExpirationData = DateTime.Parse(request.ExpirationData)
            });
            _dbContext.SaveChanges();
            return Task.FromResult(new AddSubscriptionReply { Status = "ok" });
        }

        public override Task<UpdateSubscriptionReply> UpdateSubscription(UpdateSubscriptionRequest request, ServerCallContext context)
        {
            ActivatedSubscription subscription = _dbContext.ActivatedSubscriptions.Where(x => x.Id == request.ActivatedSubscriptionId).FirstOrDefault();
            if (subscription == null)
                return Task.FromResult(new UpdateSubscriptionReply { Status = "no such subscription" });
            subscription.ExpirationData = subscription.ExpirationData.AddDays(request.Days);
            _dbContext.Update(subscription);
            return Task.FromResult(new UpdateSubscriptionReply { Status = "ok" });
        }

        private IEnumerable<SubscriptionProto> GetProtoSubscriptions(int modelId)
        {
            var temp = _dbContext.ActivatedSubscriptions.Include(x => x.Subscription).ToList();
            var result = temp.Where(x => x.ModelId == modelId)
                                .Select(x => new SubscriptionProto()
                                {
                                    Id = x.Id,
                                    Name = x.Subscription.Name,
                                    Price = x.Subscription.Price.ToString(),
                                    FunctionalAccess = x.Subscription.FunctionalAccess
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
                                Price = x.Price.ToString(),
                                FunctionalAccess = x.FunctionalAccess
                            })
                            .ToList();
            return result;

        }
    }
}
