using Gateway.Controllers.Base;
using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager.Protos;
using Microservice.MapManager.Protos;
using Microservice.SubscriptionManager;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    /// <summary>
    /// Controller for interaction with technological maps
    /// </summary>
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
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var client = new ProductService.ProductServiceClient(channel);

            using var call = client.GetProducts(new ProductRequest());
            ProductReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }
            return response?.Products;
        }

        [HttpGet("get_product_histories/{modelId}")]
        public async Task<IEnumerable<ProductHistoryProto>> GetProductHistories(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var client = new ProductService.ProductServiceClient(channel);

            using var call = client.GetProductHistoryByModelId(new GetProductHistoryByModelIdRequest() { ModelId = modelId });
            GetProductHistoryByModelIdReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }
            return response?.ProductHistories;
        }

        /// <summary>
        /// Method for checking the existence of a plot with a given cadastral number
        /// </summary>
        /// <param name="cadasterNum">Cadastral number</param>
        /// <returns>True if a parcel with a cadastral number is found otherwise false</returns>
        [HttpGet("validate_cadaster/{cadasterNum}")]
        public async Task<bool> ValidateCadasterAsync(string cadasterNum)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Map,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );

            var client = new CadasterService.CadasterServiceClient(channel);
            var reply = await client.TestCadasterAsync(new TestCadasterRequest { Cadaster = cadasterNum });

            return reply.Status.Equals("ok");
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
        public int CreateDigitalModel(string companyId, int productId, string name, double fraction, double density, string cadaster = null, string categoryName = null)
        {
            var request = new ModelRequest
            {
                Name = name,
                ProductId = productId,
                CompanyId = companyId,
                Density = density,
                Fraction = fraction
            };

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var reply = new DigitalModelService.DigitalModelServiceClient(channel).PushDigitalModels(request);

            var mapId = AddMap(reply.ModelId, cadaster, categoryName);
            reply = new DigitalModelService.DigitalModelServiceClient(channel).UpdateMapDigitalModel(new UpdateModelRequest() { MapId = mapId, ModelId = reply.ModelId });

            AddDefaultSubscription(reply.ModelId);

            return reply.ModelId;
        }

        private bool AddDefaultSubscription(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Subscription, new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });
            var client = new SubscriptionService.SubscriptionServiceClient(channel);
            var reply = client.AddSubscription(new AddSubscriptionRequest
            {
                ModelId = modelId,
                SubscriptionId = 3,
                ActivatedData = DateTime.UtcNow.ToShortDateString(),
                ExpirationData = DateTime.UtcNow.AddDays(30).ToShortDateString()
            });
            return reply.Status.Equals("ok");
        }

        private int AddMap(int modelId, string cadaster = null, string categoryName = null)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Map, new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });
            var client = new MapService.MapServiceClient(channel);
            if ((cadaster == null && categoryName != null) ||
                (cadaster != null && categoryName == null))
            {
                return -1;
            }
            var reply = client.GetMapId(new GetMapIdRequest { ModelId = modelId, Cadaster = cadaster, CategoryName = categoryName });
            return reply.MapId;
        }
    }
}
