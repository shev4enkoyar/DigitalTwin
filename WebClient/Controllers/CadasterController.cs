﻿using Grpc.Net.Client;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microservice.WebClient.Protos;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/cadaster")]
    public class CadasterController : ControllerBase
    {
        public IConfiguration Configuration { get; }

        public CadasterController(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        [HttpGet("validate/{cadaster}")]
        public async Task<IActionResult> ValidateCadaster(string cadaster)
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            using var channel = GrpcChannel.ForAddress(
                Configuration.GetSection("gRPCConnections")["Micriservices.MapManager"],
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            var client = new CadasterService.CadasterServiceClient(channel);
            var reply = await client.TestCadasterAsync(new TestCadasterRequest
            {
                Cadaster = cadaster
            });
            if(reply.Status.Equals("ok"))
                return Ok();
            return NotFound();
        }
    }
}