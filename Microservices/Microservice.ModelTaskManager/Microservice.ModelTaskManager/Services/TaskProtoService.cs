using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;
using Microservice.ModelTaskManager.DAL;
using Microservice.ModelTaskManager.Protos;
using Microsoft.EntityFrameworkCore;
using Shared;

namespace Microservice.ModelTaskManager.Services
{
    /// <summary>
    /// gRPC service for interacting with model tasks
    /// </summary>
    public class TaskProtoService : ModelTaskService.ModelTaskServiceBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private ApplicationContext DbContext { get; }

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public TaskProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        /// <summary>
        /// Method to get all model tasks
        /// </summary>
        /// <returns>Enumerating Model Tasks</returns>
        public override async Task GetTasks(SendRequest request, IServerStreamWriter<SendReply> responseStream, ServerCallContext context)
        {
            var taskReply = new SendReply();
            taskReply.Tasks.AddRange(GetProtoTasks(request.ModelId));

            await responseStream.WriteAsync(taskReply);
            await Task.FromResult(taskReply);
        }

        /// <summary>
        /// Method for getting detailed information about a task
        /// </summary>
        /// <returns>Task Detail Object</returns>
        public override async Task GetTaskDetails(GetTaskRequest request, IServerStreamWriter<GetTaskReply> responseStream, ServerCallContext context)
        {
            var taskReply = new GetTaskReply();
            taskReply.Details.AddRange(GetProtoDetails(request.TaskId));

            await responseStream.WriteAsync(taskReply);
            await Task.FromResult(taskReply);
        }

        /// <summary>
        /// Getting a task by its Id
        /// </summary>
        /// <returns>Task object</returns>
        public override Task<GetTaskByIdReply> GetTaskById(GetTaskByIdRequest request, ServerCallContext context)
        {
            var task = DbContext.Tasks.FirstOrDefault(x => x.Id == request.TaskId);
            if (task == null)
                return null;

            var modelTask = new ModelTask
            {
                Id = task.Id,
                Name = task.Name,
                StartDate = task.StartDate.ToShortDateString(),
                EndDate = task.EndDate.ToShortDateString(),
                TaskType = task.Type,
                TransportList = task.TransportList
            };
            return Task.FromResult(new GetTaskByIdReply() { Task = modelTask });
        }

        /// <summary>
        /// Task detail update method
        /// </summary>
        /// <returns>Method execution status</returns>
        public override Task<UpdateDetailReply> UpdateDetail(UpdateDetailRequest request, ServerCallContext context)
        {
            var details = DbContext.Details.Where(x => x.TaskId == request.TaskId).ToList();
            var detail = details.FirstOrDefault(x => x.Date.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture).Equals(request.Date));
            if (detail == null)
                return Task.FromResult(new UpdateDetailReply() { Status = "Not found" });

            if (request.Status != "" || request.Status == null)
                detail.Status = request.Status;

            if (request.Fuel != "" || request.Fuel == null)
                detail.Fuel = request.Fuel;

            if (request.Seeds != "" || request.Seeds == null)
                detail.Seeds = request.Seeds;

            if (request.Pesticides != "" || request.Pesticides == null)
                detail.Pesticides = request.Pesticides;

            if (request.Fertilizers != "" || request.Fertilizers == null)
                detail.Fertilizers = request.Fertilizers;

            DbContext.Update(detail);
            DbContext.SaveChanges();
            return Task.FromResult(new UpdateDetailReply() { Status = "ok" });
        }

        private IEnumerable<DetailProto> GetProtoDetails(int taskId)
        {
            return DbContext.Details.Where(x => x.TaskId == taskId).OrderBy(x => x.Date).Select(x => new DetailProto()
            {
                Id = x.Id,
                Date = x.Date.ToShortDateString(),
                Fuel = string.IsNullOrEmpty(x.Fuel) ? "" : x.Fuel,
                Seeds = string.IsNullOrEmpty(x.Seeds) ? "" : x.Seeds,
                Fertilizers = string.IsNullOrEmpty(x.Fertilizers) ? "" : x.Fertilizers,
                Pesticides = string.IsNullOrEmpty(x.Pesticides) ? "" : x.Pesticides,
                Status = string.IsNullOrEmpty(x.Status) ? "" : x.Status
            }).ToList();
        }

        private IEnumerable<ModelTask> GetProtoTasks(int modelId)
        {
            return DbContext.Tasks.Include(x => x.Details).Where(x => x.ModelId == modelId).Select(x => new ModelTask
            {
                Id = x.Id,
                StartDate = x.StartDate.ToShortDateString(),
                EndDate = x.EndDate.ToShortDateString(),
                IsComplete = x.Details.Count(detail => detail.Status.Equals(TaskStatusEnum.Done)) / x.Details.Count >= 0.8,
                TaskType = x.Type,
                Name = x.Name,
                TransportList = x.TransportList
            }).ToList();
        }
    }
}

