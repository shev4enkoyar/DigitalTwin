using Grpc.Core;
using System;
using System.Threading.Tasks;

namespace Payment.Microservice.Services
{
    public class PaymentService : Payment.PaymentBase
    {
        public override async Task GetStatus(StatusRequest request, IServerStreamWriter<StatusReply> responseStream, ServerCallContext context)
        {
            string status = request.Complete ? "succeeded" : "canceled";

            for (int i = 0; i < 3; i++)
            {
                await responseStream.WriteAsync(new StatusReply { Status = "pending" });
                await Task.Delay(TimeSpan.FromSeconds(1));
            }

            await responseStream.WriteAsync(new StatusReply { Status = status });
        }
    }
}
