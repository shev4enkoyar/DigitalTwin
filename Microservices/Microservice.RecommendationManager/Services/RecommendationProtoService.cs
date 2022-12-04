using Grpc.Core;
using Microservice.RecommendationManager.DAL;
using Microservice.RecommendationManager.Protos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.RecommendationManager.Services
{
    /// <summary>
    /// gRPC service for interacting with model recommendations
    /// </summary>
    public class RecommendationProtoService : RecommendationService.RecommendationServiceBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private ApplicationContext DbContext { get; }
        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public RecommendationProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }
        /// <summary>
        /// Method to get all model recommendations
        /// </summary>
        /// <returns>Enumerating Model Recommendations</returns>
        public override async Task GetRecommendationsByModelId(GetRecommendationsByModelIdRequest request, IServerStreamWriter<GetRecommendationsByModelIdReply> responseStream, ServerCallContext context)
        {
            var reply = new GetRecommendationsByModelIdReply();
            reply.ModelRecommendations.AddRange(GetProtoModelRecommendations(request.ModelId));

            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        private IEnumerable<ModelRecommendation> GetProtoModelRecommendations(int modelId)
        {
            return DbContext.Recommendations.Where(x => x.ModelId == modelId).Select(x => new ModelRecommendation
            {
                Id = x.Id,
                CreateDate = x.CreateDate.ToShortDateString(),
                ForecastEventText = x.ForecastEventText,
                RecommendationText = x.RecommendationText
            }).ToList();
        }
    }
}
