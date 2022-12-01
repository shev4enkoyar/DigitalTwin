using Grpc.Core;
using Microservice.DashboardManager.DAL;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    /// <summary>
    /// gRPC service for interacting with the model product
    /// </summary>
    public class ProductProtoService : ProductService.ProductServiceBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private ApplicationContext DbContext { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public ProductProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        /// <summary>
        /// Receiving method of all products
        /// </summary>
        /// <returns>Enumeration of product objects</returns>
        public override async Task GetProducts(ProductRequest request, IServerStreamWriter<ProductReply> responseStream, ServerCallContext context)
        {
            var productReply = new ProductReply();
            productReply.Products.AddRange(GetProtoProducts());

            await responseStream.WriteAsync(productReply);
            await Task.FromResult(productReply);
        }

        private IEnumerable<ProductProto> GetProtoProducts()
        {
            return DbContext.Products
                .Select(x => new ProductProto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Code = x.Code,
                    CurrentPrice = x.CurrentPrice.ToString()
                });
        }

        /// <summary>
        /// Method for getting model product by Model Id
        /// </summary>
        /// <returns>Product object</returns>
        public override Task<GetProductByModelIdReply> GetProductByModelId(GetProductByModelIdRequest request, ServerCallContext context) =>
            Task.FromResult(new GetProductByModelIdReply
            {
                Name = GetProductByModelId(request.ModelId)
            });

        private string GetProductByModelId(int modelId) =>
            DbContext.DigitalModels
            .Include(x => x.Product)
            .FirstOrDefault(x => x.Id.Equals(modelId))
            ?.Product.Name;
    }
}
