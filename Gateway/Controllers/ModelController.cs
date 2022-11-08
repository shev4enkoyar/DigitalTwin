using Gateway.Controllers.Base;
using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager.Protos;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : CompanyModelsControllerBase
    {
        /// <summary>
        /// Method for getting all products
        /// </summary>
        /// <returns>Enumerable of products</returns>
        [HttpGet("get_products")]
        public async Task<IEnumerable<ProductProto>> GetAllProducts()
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler });

            var client = new ProductService.ProductServiceClient(channel);

            using var call = client.GetProducts(new ProductRequest());
            ProductReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }
            return response.Products;
        }

        /// <summary>
        /// Method for checking the existence of a plot with a given cadastral number
        /// </summary>
        /// <param name="cadasterNum">Cadastral number</param>
        /// <returns>True if a parcel with a cadastral number is found otherwise false</returns>
        [HttpGet("validate_cadaster/{cadaster}")]
        public async Task<bool> ValidateCadasterAsync(string cadasterNum)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Map,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );

            var client = new CadasterService.CadasterServiceClient(channel);
            var reply = await client.TestCadasterAsync(new TestCadasterRequest { Cadaster = cadasterNum });

            if (reply.Status.Equals("ok"))
                return true;
            return false;
        }

        /// <summary>
        /// Method for creating a new model with given parameters
        /// </summary>
        /// <param name="companyId">Company Id</param>
        /// <param name="productId">Product Id</param>
        /// <param name="name">Name</param>
        /// <param name="cadaster">Cadaster number</param>
        /// <param name="categoryName">Category name</param>
        /// <returns>True if the model was successfully created otherwise false</returns>
        [HttpGet("create")]
        public bool CreateDigitalModel(string companyId, int productId, string name, string cadaster = null, string categoryName = null)
        {
            //TODO REDO
            ModelRequest request;
            if (cadaster == null || categoryName == null)
                request = new ModelRequest
                {
                    Name = name,
                    ProductId = productId,
                    CompanyId = companyId
                };
            else
                request = new ModelRequest
                {
                    Name = name,
                    ProductId = productId,
                    CompanyId = companyId,
                    Cadastre = cadaster,
                    CategoryName = categoryName
                };

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler });

            ModelReply reply = new DigitalModelService.DigitalModelServiceClient(channel).PushDigitalModels(request);
            if (reply.Status.Equals("ok"))
                return true;
            return false;
        }
    }
}
