using Grpc.Core;
using Microservice.InternetOfThingsManager.DAL;
using Microservice.InternetOfThingsManager.DAL.Models;
using Microservice.InternetOfThingsManager.Protos;
using Shared;
using System;
using System.Linq;
using System.Threading.Tasks;
using static Microservice.InternetOfThingsManager.Protos.InternetOfThingsService;

namespace Microservice.InternetOfThingsManager.Services
{
    public class InternetOfThingsProtoService : InternetOfThingsServiceBase
    {
        private readonly ApplicationContext _dbContext;

        public InternetOfThingsProtoService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public override Task<AddSensorReply> AddSensor(AddSensorRequest request, ServerCallContext context)
        {
            _dbContext.Sensors.Add(new Sensor()
            {
                Id = Guid.Parse(request.SensorGuid),
                ModelId = request.ModelId,
                Name = request.Name,
                FunctionalArray = request.FunctionalArray,
                IsEnabled = false,
                InitTime = DateTime.UtcNow,
                ExpireTime = DateTime.UtcNow.AddDays(1)
            });

            return Task.FromResult(new AddSensorReply() { Link = GenerateLink(request.SensorGuid) });
        }

        private string GenerateLink(string sensorGuid) => $"{MicroservicesIp.External.InternetOfThings.TrimEnd('/')}/sensor/send/{sensorGuid}";

        public override Task<RemoveSensorReply> RemoveSensor(RemoveSensorRequest request, ServerCallContext context)
        {
            RemoveSensorReply reply = new RemoveSensorReply() { IsDeleteComplete = false };
            Sensor sensor = _dbContext.Sensors.FirstOrDefault(x => x.Id.Equals(Guid.Parse(request.SensorGuid)));
            if (sensor != null)
            {
                _dbContext.Sensors.Remove(sensor);
                reply.IsDeleteComplete = true;
            }
            return Task.FromResult(reply);
        }
    }
}
