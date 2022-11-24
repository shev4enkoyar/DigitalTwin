using Grpc.Core;
using Grpc.Net.Client;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    /// <summary>
    /// Controller for interaction with technological map tasks
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        /// <summary>
        /// Method to get all tasks by model ID
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <returns>Enumerating Model Tasks</returns>
        [HttpGet("get_all/{modelId:int}")]
        public async Task<IEnumerable<ModelTask>> GetAllByModelId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
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

        /// <summary>
        /// Task information update method
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <param name="taskId">Task Id</param>
        /// <param name="date">Date task</param>
        /// <param name="status">Day status</param>
        /// <param name="fuel">Fuel on day</param>
        /// <param name="seeds">Seeds on day</param>
        /// <param name="fertilizers">Fertilizers on day</param>
        /// <param name="pesticides">Pesticides on day</param>
        /// <returns>Status 200 if successful, otherwise 400</returns>
        [HttpGet("update_detail/{modelId:int}")]
        public async Task<string> UpdateDetailByModelId(int modelId, int taskId, string date, string status = "", string fuel = "", string seeds = "", string fertilizers = "", string pesticides = "")
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
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

        /// <summary>
        /// Method for obtaining detailed information on a task
        /// </summary>
        /// <param name="taskId">Task Id</param>
        /// <returns>Detailed Information Object</returns>
        [HttpGet("get_details/{taskId}")]
        public async Task<IEnumerable<DetailProto>> GetDetailsByTaskId(int taskId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
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

        /// <summary>
        /// Method for getting the task object by its Id
        /// </summary>
        /// <param name="taskId">Task Id</param>
        /// <returns>Model task object</returns>
        [HttpGet("get_task_by_id/{taskId}")]
        public async Task<ModelTask> GetTaskById(int taskId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );
            var client = new ModelTaskService.ModelTaskServiceClient(channel);
            var reply = await client.GetTaskByIdAsync(new GetTaskByIdRequest { TaskId = taskId });
            return reply.Task;
        }
    }
}
