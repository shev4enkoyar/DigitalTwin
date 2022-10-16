﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
using Microservice.WebClient.Protos;
using Grpc.Net.Client;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Grpc.Core;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json.Serialization;
using Microservice.DashboardManager.Protos;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/techcard")]
    public class TechCardController : ControllerBase
    {
        public IConfiguration Configuration { get; }

        public TechCardController(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        [HttpGet("get_all")]
        public async Task<IEnumerable<ModelProto>> GetDigitalModels()
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return null;

            using var channel = GrpcChannel.ForAddress(
                Configuration.GetSection("gRPCConnections")["Micriservices.DashboardManager"],
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            GetModelsReply response = null;
            //TODO REDO
            using (var call = new DigitalModelService.DigitalModelServiceClient(channel).GetDigitalModels(new GetModelsRequest { CompanyId = userId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    Console.WriteLine(call.ResponseStream.Current.Models);
                    response = call.ResponseStream.Current;
                }
            }
            return response.Models;
        }

        [HttpGet("create")]
        public async Task<IActionResult> CreateDigitalModel( int productId, string name)
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();
            //TODO REDO
            ModelRequest request = new ModelRequest
            {
                Name = name,
                ProductId = productId,
                CompanyId = userId
            };

            using var channel = GrpcChannel.ForAddress(
                Configuration.GetSection("gRPCConnections")["Micriservices.DashboardManager"],
                new GrpcChannelOptions { HttpHandler = httpHandler });

            ModelReply reply = new DigitalModelService.DigitalModelServiceClient(channel).PushDigitalModels(request);
            if (reply.Status.Equals("ok"))
                return Ok();
            return Ok();
        }
    }
}