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
            if (_dbContext.DigitalModels.Any(x => x.UserId == request.UserId))
            {
                //error
                return Task.FromResult(new ModelReply { Status = "record already exist" });
            }
            else 
            {
                var model = new DigitalModel();
                model.Name = request.Name;
                model.UserId = request.UserId;
                model.ProductId = request.ProductId;
                _dbContext.DigitalModels.Add(model);
                _dbContext.SaveChanges();
                //here address where  
                using var channel = GrpcChannel.ForAddress("https://localhost:7042");
                var client = new MapService.MapServiceClient(channel);
                var reply = client.GetMapId( new GetMapIdRequest { ModelId = model.Id } );
                return Task.FromResult(new ModelReply { Status = "ok" });
            }
            
            
        }

        public override async Task GetDigitalModels(GetModelsRequest request, IServerStreamWriter<GetModelsReply> responseStream, ServerCallContext context)
        {
            GetModelsReply modelsReply = new GetModelsReply();
            modelsReply.Models.AddRange(GetProtoModels(request.UserId));
            await responseStream.WriteAsync(modelsReply);
            await Task.FromResult(modelsReply);
        }

        private IEnumerable<ModelProto> GetProtoModels(int userId)
        {
            return _dbContext.DigitalModels
                .Include(x => x.Product.Name)
                .Include(x => x.Product.Code)
                .Include(x => x.Product.CurrentPrice)
                .Where(x => x.MapId == userId)
                .Select(x => new ModelProto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    UserId = x.UserId,
                    ProductName = x.Product.Name,
                    ProductCode = x.Product.Code,
                    ProductCurrentPrice = x.Product.CurrentPrice.ToString(),
                    MapId = x.MapId
                });
        }
    }
}
