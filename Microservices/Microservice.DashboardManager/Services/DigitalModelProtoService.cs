using Grpc.Core;
using Microservice.DashboardManager.DAL;
using Microservice.DashboardManager.DAL.Models;
using Microservice.DashboardManager.Protos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    /// <summary>
    /// gRPC service for interacting with the digital model
    /// </summary>
    public class DigitalModelProtoService : DigitalModelService.DigitalModelServiceBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private ApplicationContext DbContext { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public DigitalModelProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        /// <summary>
        /// Method for adding a new model
        /// </summary>
        /// <returns>Method execution status</returns>
        public override Task<ModelReply> PushDigitalModels(ModelRequest request, ServerCallContext context)
        {
            var model = new DigitalModel
            {
                Name = request.Name,
                CompanyId = Guid.Parse(request.CompanyId),
                ProductId = request.ProductId,
                Density = request.Density,
                Fraction = request.Fraction
            };

            DbContext.DigitalModels.Add(model);
            DbContext.SaveChanges();

            return Task.FromResult(new ModelReply { Status = "ok", ModelId = model.Id });
        }

        /// <summary>
        /// Method for updating the map on the model
        /// </summary>
        /// <returns>Method execution status</returns>
        public override Task<ModelReply> UpdateMapDigitalModel(UpdateModelRequest request, ServerCallContext context)
        {
            var model = DbContext.DigitalModels.FirstOrDefault(x => x.Id == request.ModelId);

            if (model == null)
                return Task.FromResult(new ModelReply { Status = "not ok" });

            model.MapId = request.MapId;

            DbContext.Update(model);
            DbContext.SaveChanges();

            return Task.FromResult(new ModelReply { Status = "ok", ModelId = model.Id });
        }

        public override async Task GetDigitalModels(GetModelsRequest request, IServerStreamWriter<GetModelsReply> responseStream, ServerCallContext context)
        {
            var modelsReply = new GetModelsReply();
            modelsReply.Models.AddRange(GetProtoModels(request.CompanyId));

            await responseStream.WriteAsync(modelsReply);
            await Task.FromResult(modelsReply);
        }

        private IEnumerable<ModelProto> GetProtoModels(string userId)
        {
            return DbContext.DigitalModels
                .Include(x => x.Product)
                .Where(x => x.CompanyId.ToString().Equals(userId))
                .Select(x => new ModelProto
                {
                    Id = x.Id,
                    Name = x.Name,
                    CompanyId = x.CompanyId.ToString(),
                    ProductName = x.Product.Name,
                    ProductCode = string.IsNullOrEmpty(x.Product.Code) ? "null" : x.Product.Code,
                    ProductCurrentPrice = x.Product.CurrentPrice.ToString(),
                    MapId = x.MapId.Value,
                    Density = x.Density,
                    Fraction = x.Fraction
                }).ToList();
        }
    }
}
