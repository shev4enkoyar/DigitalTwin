using Grpc.Core;
using Microservice.TaskManager.Protos;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Microservice.TaskManager.Services
{
    /*public class TaskProtoService : TaskService.TaskServiceBase
    {
        public override async Task GetTasks(SendRequest request, IServerStreamWriter<SendReply> responseStream, ServerCallContext context)
        {
            SendReply taskReply = new SendReply();
            taskReply.Tasks.AddRange(GetProtoTasks(request.ModelId));
            await responseStream.WriteAsync(taskReply);
            await Task.FromResult(taskReply);
        }
    }

    private IEnumerable<ModelTask> GetProtoTasks(int modelId)
    {
        var task1 = new ModelTask() {
            Id = 1, 
            StartDate = DateTime.UtcNow.AddDays(-60).ToString(), 
            EndDate = DateTime.UtcNow.AddDays(-30).ToString(), 
            IsComplete = true,
            Progress = 100,
            TaskType = 
        };
        var result = new List<ModelTask>() { };
        return result;

    }*/
}
