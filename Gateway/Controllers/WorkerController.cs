using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        [HttpGet("create")]
        public bool CreateWorker(int modelId, int postId, string fio, double rate, double salary)
        {
            var request = new AddWorkerRequest
            {
                Fio = fio,
                ModelId = modelId,
                PostId = postId,
                Rate = rate,
                Salary = salary
            };

            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var reply = new WorkerService.WorkerServiceClient(channel).AddWorker(request);

            return reply.Status.Equals("ok");
        }

        [HttpGet("get_posts")]
        public async Task<IEnumerable<PostProto>> GetAllPosts()
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var client = new WorkerService.WorkerServiceClient(channel);

            using var call = client.GetAllPosts(new GetAllPostsRequest());
            GetAllPostsReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }
            return response?.Posts;
        }
    }
}
