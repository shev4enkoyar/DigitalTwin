using Gateway.Controllers.Base;
using Grpc.Core;
using Grpc.Net.Client;
using Microservice.SubscriptionManager;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : CompanyModelsControllerBase
    {
        /// <summary>
        /// Method to get all subscriptions
        /// </summary>
        /// <returns>Listing all subscriptions</returns>
        [HttpGet("get_all")]
        public async Task<IEnumerable<SubscriptionProto>> GetAllSubscriptions()
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Subscription,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            SubscriptionsReply response = null;

            using (var call = new SubscriptionService.SubscriptionServiceClient(channel).GetAllSubscriptions(new AllSubscriptionsRequest()))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            if (response == null)
                return null;
            return response.Subscriptions;


        }

        /// <summary>
        /// Method to activate a subscription for a model
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <param name="days">Num days to update</param>
        /// <param name="subscriptionId">Subscription Id</param>
        /// <returns>HTTP code 200 or error</returns>
        [HttpGet("activate/{modelId}")]
        public IActionResult ActivateSubscription(int modelId, int days, int subscriptionId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Subscription,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var client = new SubscriptionService.SubscriptionServiceClient(channel);
            var reply = client.AddSubscription(new AddSubscriptionRequest
            {
                ActivatedData = DateTime.Now.ToString(),
                ExpirationData = DateTime.Now.AddDays(days).ToString(),
                SubscriptionId = subscriptionId,
                ModelId = modelId
            });
            if (reply.Status.Equals("ok"))
                return Ok();
            return BadRequest(reply.Status);
        }

        /// <summary>
        /// Method to update the current subscription for a model
        /// </summary>
        /// <param name="days">Num day for subscription</param>
        /// <param name="subscriptionId">Subscription Id</param>
        /// <returns>HTTP code 200 or error</returns>
        [HttpGet("update")]
        public IActionResult UpdateActivatedSubscription(int days, int subscriptionId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Subscription,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var client = new SubscriptionService.SubscriptionServiceClient(channel);
            var reply = client.UpdateSubscription(new UpdateSubscriptionRequest
            {
                ActivatedSubscriptionId = subscriptionId,
                Days = days
            });
            if (reply.Status.Equals("ok"))
                return Ok();
            return BadRequest(reply.Status);
        }

        /// <summary>
        /// Method for getting a dictionary of model names with their list of subscriptions
        /// </summary>
        /// <param name="companyId">Company Id</param>
        /// <returns>Dictionary Model Name:Subscription List</returns>
        [HttpGet("get_models_with_subscriptions/{companyId}")]
        public async Task<Dictionary<string, List<string>>> GetAllModelsSubscriptions(string companyId)
        {
            var models = GetModelsByCompanyId(companyId).Result;
            if (models == null)
                return null;

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Subscription,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            var modelSubscriptions = new Dictionary<string, List<string>>();
            foreach (var model in models)
            {
                SubscriptionsReply response = null;
                using (var call = new SubscriptionService.SubscriptionServiceClient(channel).GetActivatedSubscriptions(new ActivatedSubscriptionsRequest { ModelId = model.Id }))
                {
                    while (await call.ResponseStream.MoveNext())
                    {
                        response = call.ResponseStream.Current;
                    }
                }
                var subscriptions = response?.Subscriptions.Select(item => item.Name).ToList();
                modelSubscriptions.Add(model.Name, subscriptions);
            }
            return modelSubscriptions;
        }

        [HttpGet("get_activated_subscription/{modelId}")]
        public async Task<IEnumerable<SubscriptionProto>> GetActivatedSubscription(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Subscription,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );
            SubscriptionsReply response = null;
            using (var call = new SubscriptionService.SubscriptionServiceClient(channel).GetActivatedSubscriptions(new ActivatedSubscriptionsRequest { ModelId = modelId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }

            return response?.Subscriptions;
        }
    }
}
