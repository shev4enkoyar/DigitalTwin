using Grpc.Core;
using Grpc.Net.Client;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Shared;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;

namespace WebClient.Controllers
{
    [Authorize]
    [Route("api/products")]
    public class ProductsController
    {
        public IConfiguration Configuration { get; }

        public ProductsController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductProto>> Get()
        {
            var httpHandler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = httpHandler });

            var client = new ProductService.ProductServiceClient(channel);

            using var call = client.GetProducts(new ProductRequest());
            ProductReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }
            return response.Products;
        }
    }
}
