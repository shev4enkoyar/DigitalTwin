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
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            SendReply response = null;
            using (var call = new ModelTaskService.ModelTaskServiceClient(channel)
                .GetTasks(new SendRequest { ModelId = modelId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            return response?.Tasks;
        }

        [HttpGet("update_detail/{modelId}")]
        public async Task<string> UpdateDetailByModelId(int modelId, int taskId, string date, string status = "", string fuel = "", string seeds = "", string fertilizers = "", string pesticides = "")
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );
            status ??= "";
            fuel ??= "";
            seeds ??= "";
            fertilizers ??= "";
            pesticides ??= "";
            var client = new ModelTaskService.ModelTaskServiceClient(channel);
            var reply = await client
                .UpdateDetailAsync(new UpdateDetailRequest { ModelId = modelId, TaskId = taskId, Status = status, Fuel = fuel, Date = date, Seeds = seeds, Fertilizers = fertilizers, Pesticides = pesticides });
            return reply.Status;
        }

        [HttpGet("get_details/{taskId}")]
        public async Task<IEnumerable<DetailProto>> GetDetailsByTaskId(int taskId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );

            GetTaskReply response = null;
            using (var call = new ModelTaskService.ModelTaskServiceClient(channel)
                .GetTaskDetails(new GetTaskRequest { TaskId = taskId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            return response?.Details;
        }

        [HttpGet("get_task_by_id/{taskId}")]
        public async Task<ModelTask> GetTaskById(int taskId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = MicroservicesIp.DefaultHttpHandler }
            );
            var client = new ModelTaskService.ModelTaskServiceClient(channel);
            var reply = await client.GetTaskByIdAsync(new GetTaskByIdRequest { TaskId = taskId });
            return reply.Task;
        }
    }
}
