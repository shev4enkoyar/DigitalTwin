using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.Controllers.Base
{
    /// <summary>
    /// Base controller class containing the getter for all models
    /// </summary>
    public class CompanyModelsControllerBase : ControllerBase
    {
        /// <summary>
        /// Method for getting all models by company ID
        /// </summary>
        /// <param name="companyId">Identification number of the company to which the user and models belong</param>
        /// <returns>Enumeration of models owned by the company</returns>
        [HttpGet("get_models/{companyId}")]
        public async Task<IEnumerable<ModelProto>> GetModelsByCompanyId(string companyId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );

            GetModelsReply response = null;
            using (var call = new DigitalModelService.DigitalModelServiceClient(channel)
                .GetDigitalModels(new GetModelsRequest { CompanyId = companyId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    Console.WriteLine(call.ResponseStream.Current.Models);
                    response = call.ResponseStream.Current;
                }
            }
            return response?.Models;
        }
    }
}
