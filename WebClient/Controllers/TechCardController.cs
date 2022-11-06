﻿using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager.Protos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Shared;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Models;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TechCardController : ControllerBase
    {
        public IConfiguration Configuration { get; }
        private readonly UserManager<ApplicationUser> _userManager;

        public TechCardController(IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
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
            var user = await _userManager.FindByIdAsync(userId);
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = httpHandler }
            );

            GetModelsReply response = null;
            //TODO REDO
            using (var call = new DigitalModelService.DigitalModelServiceClient(channel)
                .GetDigitalModels(new GetModelsRequest { CompanyId = user.CompanyId.ToString() }))
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
        public async Task<IActionResult> CreateDigitalModel(int productId, string name, string cadaster = null, string categoryName = null)
        {
            var httpHandler = new HttpClientHandler()
            {
                ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
            };

            string userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();
            var user = await _userManager.FindByIdAsync(userId);
            //TODO REDO
            ModelRequest request;
            if (cadaster == null || categoryName == null)
                request = new ModelRequest
                {
                    Name = name,
                    ProductId = productId,
                    CompanyId = user.CompanyId.ToString()

                };
            else
                request = new ModelRequest
                {
                    Name = name,
                    ProductId = productId,
                    CompanyId = user.CompanyId.ToString(),
                    Cadastre = cadaster,
                    CategoryName = categoryName
                };

            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = httpHandler });

            ModelReply reply = new DigitalModelService.DigitalModelServiceClient(channel).PushDigitalModels(request);
            if (reply.Status.Equals("ok"))
                return Ok();
            return BadRequest();
        }
    }
}