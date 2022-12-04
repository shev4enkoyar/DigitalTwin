using Grpc.Core;
using Microservice.DashboardManager.DAL;
using Microservice.DashboardManager.DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.DashboardManager.Services
{
    public class WorkerProtoService : WorkerService.WorkerServiceBase
    {
        /// <summary>
        /// Database access property
        /// </summary>
        private ApplicationContext DbContext { get; }
        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public WorkerProtoService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        public override Task<AddWorkerReply> AddWorker(AddWorkerRequest request, ServerCallContext context)
        {
            var worker = new Worker()
            {
                DigitalModelId = request.ModelId,
                FIO = request.Fio,
                PostId = request.PostId,
                Rate = request.Rate,
                Salary = request.Salary
            };

            DbContext.Workers.Add(worker);
            DbContext.SaveChanges();

            return Task.FromResult(new AddWorkerReply { Status = "ok" });
        }

        public override async Task GetAllPosts(GetAllPostsRequest request, IServerStreamWriter<GetAllPostsReply> responseStream, ServerCallContext context)
        {
            var reply = new GetAllPostsReply();
            reply.Posts.AddRange(GetProtoPosts());

            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        private IEnumerable<PostProto> GetProtoPosts()
        {
            return DbContext.Posts
                .Select(x => new PostProto
                {
                    Id = x.Id,
                    Post = x.Title
                }).ToList();
        }
    }
}
