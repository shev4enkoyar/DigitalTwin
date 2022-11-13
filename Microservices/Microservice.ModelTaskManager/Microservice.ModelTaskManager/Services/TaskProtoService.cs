using Grpc.Core;
using Microservice.ModelTaskManager.Protos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Microservice.TaskManager.Services
{
    public class TaskProtoService : ModelTaskService.ModelTaskServiceBase
    {
        public override async Task GetTasks(SendRequest request, IServerStreamWriter<SendReply> responseStream, ServerCallContext context)
        {
            SendReply taskReply = new SendReply();
            taskReply.Tasks.AddRange(GetProtoTasks(request.ModelId));

            await responseStream.WriteAsync(taskReply);
            await Task.FromResult(taskReply);
        }

        private IEnumerable<ModelTask> GetProtoTasks(int modelId)
        {
            // TODO replace mock objects with db data
            var task1 = new ModelTask()
            {
                Id = 1,
                StartDate = DateTime.UtcNow.AddDays(-60).ToString(),
                EndDate = DateTime.UtcNow.AddDays(-30).ToString(),
                IsComplete = true,
                Progress = 100,
                TaskType = "Засев"
            };
            var task2 = new ModelTask()
            {
                Id = 2,
                StartDate = DateTime.UtcNow.AddDays(-40).ToString(),
                EndDate = DateTime.UtcNow.AddDays(-10).ToString(),
                IsComplete = true,
                Progress = 100,
                TaskType = "Обработка"
            };
            var task3 = new ModelTask()
            {
                Id = 3,
                StartDate = DateTime.UtcNow.AddDays(-5).ToString(),
                EndDate = DateTime.UtcNow.AddDays(29).ToString(),
                IsComplete = true,
                Progress = 20,
                TaskType = "Сбор"
            };
            var task4 = new ModelTask()
            {
                Id = 4,
                StartDate = DateTime.UtcNow.AddDays(-1).ToString(),
                EndDate = DateTime.UtcNow.AddDays(30).ToString(),
                IsComplete = true,
                Progress = 5,
                TaskType = "Сбор"
            };
            var result = new List<ModelTask>() { task1, task2, task3, task4 };
            return result;

        }
    }


}
