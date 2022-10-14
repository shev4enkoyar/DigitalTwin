using Grpc.Core;
using Microservice.DashboardManager.DAL;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    public class ProductProtoService : ProductService.ProductServiceBase
    {
        private readonly ApplicationContext _dbContext;

        public ProductProtoService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task GetProducts(ProductRequest request, IServerStreamWriter<ProductReply> responseStream, ServerCallContext context)
        {
            ProductReply productReply = new ProductReply();
            productReply.Products.AddRange(GetProtoProducts());
            await responseStream.WriteAsync(productReply);
            await Task.FromResult(productReply);
        }

        private IEnumerable<ProductProto> GetProtoProducts()
        {
            return _dbContext.Products
                .Select(x => new ProductProto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    CurrentPrice = x.CurrentPrice.ToString()
                });
        }
    }
}
