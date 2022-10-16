using Grpc.Net.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using Microservice.WebClient.Protos;
using Grpc.Core;

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
            var httpHandler = new HttpClientHandler();
            httpHandler.ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator;
            using var channel = GrpcChannel.ForAddress(Configuration.GetSection("gRPCConnections")["Micriservices.DashboardManager"], new GrpcChannelOptions { HttpHandler = httpHandler });
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
