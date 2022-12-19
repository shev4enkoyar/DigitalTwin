using Grpc.Core;
using Microservice.RecommendationManager.DAL;
using Microservice.RecommendationManager.DAL.Models;
using Microservice.RecommendationManager.Protos;
using Shared;
using System;
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
        private const int LimitDays = 60;
        private const int LimitOldRows = 10;

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
            await RemoveOldRecommendations(request.ModelId);
            reply.ModelRecommendations.AddRange(GetProtoModelRecommendations(request.ModelId));

            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        private async Task RemoveOldRecommendations(int modelId)
        {
            var oldRecommendations = DbContext.Recommendations
                .Where(x => x.ModelId == modelId)
                .ToList();

            var oldDateRecommendations = oldRecommendations
                .Where(x => x.CreateDate <= SharedTools.ConvertFromJsonDate(DateTime.UtcNow).AddDays(-LimitDays))
                .ToList();

            var orderedOldRecommendations = oldDateRecommendations
                .OrderBy(x => x.CreateDate)
                .ToList();

            if (orderedOldRecommendations.Count <= LimitOldRows)
                return;

            DbContext.Recommendations
                .RemoveRange(orderedOldRecommendations
                    .GetRange(0, orderedOldRecommendations.Count - LimitOldRows));
            await DbContext.SaveChangesAsync();
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

        public override async Task<AddRecommendationReply> AddRecommendation(AddRecommendationRequest request, ServerCallContext context)
        {
            await DbContext.Recommendations.AddAsync(new Recommendation
            {
                ModelId = request.ModelId,
                ForecastEventText = request.ForecastEventText,
                RecommendationText = request.ForecastEventText,
                CreateDate = SharedTools.ConvertFromJsonDate(DateTime.UtcNow)
            });

            await DbContext.SaveChangesAsync();

            return await Task.FromResult(new AddRecommendationReply { Status = true });
        }
    }
}
