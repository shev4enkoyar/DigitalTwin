using Grpc.Core;
using Microservice.ModelTaskManager.DAL;
using Microservice.ModelTaskManager.Protos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.TaskManager.Services
{
    public class TaskProtoService : ModelTaskService.ModelTaskServiceBase
    {
        private ApplicationContext _dbContext { get; }

        public TaskProtoService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override async Task GetTasks(SendRequest request, IServerStreamWriter<SendReply> responseStream, ServerCallContext context)
        {
            SendReply taskReply = new SendReply();
            taskReply.Tasks.AddRange(GetProtoTasks(request.ModelId));

            await responseStream.WriteAsync(taskReply);
            await Task.FromResult(taskReply);
        }

        public override async Task GetTaskDetails(GetTaskRequest request, IServerStreamWriter<GetTaskReply> responseStream, ServerCallContext context)
        {
            GetTaskReply taskReply = new GetTaskReply();
            taskReply.Details.AddRange(GetProtoDetails(request.TaskId));

            await responseStream.WriteAsync(taskReply);
            await Task.FromResult(taskReply);
        }

        public override Task<GetTaskByIdReply> GetTaskById(GetTaskByIdRequest request, ServerCallContext context)
        {
            var task = _dbContext.Tasks.FirstOrDefault(x => x.Id == request.TaskId);
            ModelTask modelTask = new ModelTask()
            {
                Id = task.Id,
                Name = task.Name,
                StartDate = task.StartDate.ToShortDateString(),
                EndDate = task.EndDate.ToShortDateString(),
                TaskType = task.Type,
                TransportList = task.TransportList
            };
            return Task.FromResult(new GetTaskByIdReply() { Task = modelTask});
        }

        private IEnumerable<DetailProto> GetProtoDetails(int taskId)
        {
            return _dbContext.Details.Where(x => x.TaskId == taskId).Select(x => new DetailProto()
            {
                Id = x.Id,
                Date = x.Date.ToShortDateString(),
                Fuel = x.Fuel,
                SomeInfo = x.SomeInfo,
                Status = x.Status
            }).ToList();
        }

        private IEnumerable<ModelTask> GetProtoTasks(int modelId)
        {
            return _dbContext.Tasks.Include(x => x.Details).Select(x => new ModelTask()
            {
                Id = x.Id,
                StartDate = x.StartDate.ToShortDateString(),
                EndDate = x.EndDate.ToShortDateString(),
                IsComplete = x.Details.Where(x => x.Status.Equals("done")).Count() / x.Details.Count >= 0.8,
                TaskType = x.Type,
                Name = x.Name
            }).ToList();
        }

    }
}

