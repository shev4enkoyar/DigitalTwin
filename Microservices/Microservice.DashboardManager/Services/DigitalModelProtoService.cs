using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager.DAL;
using Microservice.DashboardManager.DAL.Models;
using Microservice.DashboardManager.Protos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Shared;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    public class DigitalModelProtoService : DigitalModelService.DigitalModelServiceBase
    {
        private readonly ApplicationContext _dbContext;
        private readonly IConfiguration _configuration;

        public DigitalModelProtoService(ApplicationContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }


        public override Task<ModelReply> PushDigitalModels(ModelRequest request, ServerCallContext context)
        {
            var model = new DigitalModel
            {
                Name = request.Name,
                CompanyId = System.Guid.Parse(request.CompanyId),
                ProductId = request.ProductId
            };
            _dbContext.DigitalModels.Add(model);
            _dbContext.SaveChanges();
            return Task.FromResult(new ModelReply { Status = "ok", ModelId = model.Id });
        }

        public override Task<ModelReply> UpdateMapDigitalModel(UpdateModelRequest request, ServerCallContext context)
        {
            var model = _dbContext.DigitalModels.FirstOrDefault(x => x.Id == request.ModelId);
            model.MapId = request.MapId;
            _dbContext.Update(model);
            _dbContext.SaveChanges();
            return Task.FromResult(new ModelReply { Status = "ok", ModelId = model.Id });
        }

        public override async Task GetDigitalModels(GetModelsRequest request, IServerStreamWriter<GetModelsReply> responseStream, ServerCallContext context)
        {
            GetModelsReply modelsReply = new GetModelsReply();
            modelsReply.Models.AddRange(GetProtoModels(request.CompanyId));
            await responseStream.WriteAsync(modelsReply);
            await Task.FromResult(modelsReply);
        }

        private IEnumerable<ModelProto> GetProtoModels(string userId)
        {
            var temp = _dbContext.DigitalModels.Include(x => x.Product).ToList();
            var result = temp.Where(x => x.CompanyId.ToString().Equals(userId))
                                .Select(x => new ModelProto()
                                {
                                    Id = x.Id,
                                    Name = x.Name,
                                    CompanyId = x.CompanyId.ToString(),
                                    ProductName = x.Product.Name,
                                    ProductCode = x.Product.Code,
                                    ProductCurrentPrice = x.Product.CurrentPrice.ToString(),
                                    MapId = (int)x.MapId
                                })
                                .ToList();
            return result;

        }
    }
}
