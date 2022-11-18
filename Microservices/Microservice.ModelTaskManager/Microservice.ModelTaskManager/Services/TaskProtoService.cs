using Grpc.Core;
using Microservice.ModelTaskManager.DAL;
using Microservice.ModelTaskManager.Protos;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.TaskManager.Services
{
    public class TaskProtoService : ModelTaskService.ModelTaskServiceBase
    {
        private ApplicationContext DbContext { get; }

        public TaskProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
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
            var task = DbContext.Tasks.FirstOrDefault(x => x.Id == request.TaskId);
            ModelTask modelTask = new ModelTask()
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
            return DbContext.Details.Where(x => x.TaskId == taskId).Select(x => new DetailProto()
            {
                Id = x.Id,
                Date = x.Date.ToShortDateString(),
                Fuel = x.Fuel,
                Seeds = x.Seeds,
                Fertilizers = x.Fertilizers,
                Pesticides = x.Pesticides,
                Status = x.Status
            }).ToList();
        }

        private IEnumerable<ModelTask> GetProtoTasks(int modelId)
        {
            return DbContext.Tasks.Include(x => x.Details).Select(x => new ModelTask()
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

