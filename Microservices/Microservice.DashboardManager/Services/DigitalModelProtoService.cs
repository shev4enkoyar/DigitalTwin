using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager.DAL;
using Microservice.DashboardManager.DAL.Models;
using Microservice.DashboardManager.Protos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    public class DigitalModelProtoService : DigitalModelService.DigitalModelServiceBase
    {
        private readonly ApplicationContext _dbContext;

        public DigitalModelProtoService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }


        public override Task<ModelReply> PushDigitalModels(ModelRequest request, ServerCallContext context)
        {
            //TODO TEST EXAMPLE NEED REFACTOR

            var model = new DigitalModel
            {
                Name = request.Name,
                CompanyId = System.Guid.Parse(request.CompanyId),
                ProductId = request.ProductId
            };
            _dbContext.DigitalModels.Add(model);
            _dbContext.SaveChanges();
            //TODO here address where  
            using var channel = GrpcChannel.ForAddress("https://localhost:49165");
            var client = new MapService.MapServiceClient(channel);
            var reply = client.GetMapId(new GetMapIdRequest { ModelId = model.Id });
            model.MapId = reply.MapId;
            _dbContext.Update(model);
            _dbContext.SaveChanges();
            return Task.FromResult(new ModelReply { Status = "ok" });

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
