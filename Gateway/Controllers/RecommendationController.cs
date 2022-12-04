using Gateway.Controllers.Base;
using Grpc.Core;
using Grpc.Net.Client;
using Microservice.RecommendationManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    /// <summary>
    /// Controller for working with recommendation data
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : CompanyModelsControllerBase
    {
        /// <summary>
        /// Method to get all model recommendations
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <returns>Recommendation Object</returns>
        [HttpGet("get_all/{modelId}")]
        public async Task<IEnumerable<ModelRecommendation>> GetRecommendationsByModelId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Recommendation,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var client = new RecommendationService.RecommendationServiceClient(channel);

            using var call = client.GetRecommendationsByModelId(new GetRecommendationsByModelIdRequest() { ModelId = modelId });
            GetRecommendationsByModelIdReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }
            return response?.ModelRecommendations;
        }
    }
}
