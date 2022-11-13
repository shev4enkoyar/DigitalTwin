﻿using Grpc.Core;
using Grpc.Net.Client;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        /// <summary>
        /// Method to get all tasks by model ID
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <returns>Enumerating Model Tasks</returns>
        [HttpGet("get_all/{modelId}")]
        public async Task<IEnumerable<ModelTask>> GetAllByModelId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );

            SendReply response = null;
            //TODO REDO
            using (var call = new ModelTaskService.ModelTaskServiceClient(channel)
                .GetTasks(new SendRequest { ModelId = modelId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            return response.Tasks;
        }
    }

    static class TaskTypes
    {
        /// <summary>
        /// Высев
        /// </summary>
        static class Sowing
        {
            
        }
        /// <summary>
        /// Обработка
        /// </summary>
        static class Treatment
        {

        }
        /// <summary>
        /// Сбор
        /// </summary>
        static class Harvesting
        {

        }
    }
}
