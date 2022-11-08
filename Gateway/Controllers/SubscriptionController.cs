using Gateway.Controllers.Base;
using Gateway.Models.SubModels;
using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Shared;
using System;
using System.Collections.Generic;
using System.Net.Http;
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
        public async Task<IEnumerable<FullSubscriptionModel>> GetAllSubscriptions()
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
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
            List<FullSubscriptionModel> result = new List<FullSubscriptionModel>();
            foreach (var subscription in response.Subscriptions)
            {
                List<string> functions = new List<string>();
                foreach (var id in subscription.FunctionalAccess.Split(";"))
                {
                    // TODO Делать на WebClient functions.Add(_dbContext.Functionals.FirstOrDefault(x => x.Id == int.Parse(id)).Name);
                }
                result.Add(new FullSubscriptionModel { Id = subscription.Id, Functions = functions, Name = subscription.Name, Price = subscription.Price });
            }
            return result;
        }

        /// <summary>
        /// Method to activate a subscription for a model
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <param name="days">Num days to update</param>
        /// <param name="subscriptionId">Subscription Id</param>
        /// <returns>HTTP code 200 or error</returns>
        [HttpGet("activate/{modelId}")]
        public async Task<IActionResult> ActivateSubscription(int modelId, int days, int subscriptionId)
        {
            //TODO REDO
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );

            var client = new SubscriptionClientService.SubscriptionClientServiceClient(channel);
            var reply = await client.AddClientSubscriptionAsync(new AddClientSubscriptionRequest
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
        public async Task<IActionResult> UpdateActivatedSubscription(int days, int subscriptionId)
        {
            //TODO REDO
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );

            var client = new SubscriptionClientService.SubscriptionClientServiceClient(channel);
            var reply = await client.UpdateClientSubscriptionAsync(new UpdateClientSubscriptionRequest
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
        public async Task<string> GetAllModelsSubscriptions(string companyId)
        {
            var models = GetModelsByCompanyId(companyId).Result;
            if (models == null)
                return null;

            //TODO REDO
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
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
    }
}
