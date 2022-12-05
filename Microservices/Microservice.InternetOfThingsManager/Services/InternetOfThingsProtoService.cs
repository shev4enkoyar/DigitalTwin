using Grpc.Core;
using Microservice.InternetOfThingsManager.DAL;
using Microservice.InternetOfThingsManager.DAL.Models;
using Microservice.InternetOfThingsManager.Protos;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.InternetOfThingsManager.Services
{
    public class InternetOfThingsProtoService : InternetOfThingsService.InternetOfThingsServiceBase
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
            _dbContext.SaveChanges();
            return Task.FromResult(new AddSensorReply() { Link = GenerateLink(request.SensorGuid) });
        }

        private string GenerateLink(string sensorGuid) => $"{MicroservicesIp.External.InternetOfThings.TrimEnd('/')}/sensor/send/{sensorGuid}";

        public override Task<RemoveSensorReply> RemoveSensor(RemoveSensorRequest request, ServerCallContext context)
        {
            var reply = new RemoveSensorReply() { IsDeleteComplete = false };
            var sensor = _dbContext.Sensors.FirstOrDefault(x => x.Id.Equals(Guid.Parse(request.SensorGuid)));
            if (sensor == null) return Task.FromResult(reply);
            _dbContext.Sensors.Remove(sensor);
            _dbContext.SaveChanges();
            reply.IsDeleteComplete = true;
            return Task.FromResult(reply);
        }

        public override async Task GetAllSensors(GetAllSensorsRequest request, IServerStreamWriter<GetAllSensorsReply> responseStream, ServerCallContext context)
        {
            var reply = new GetAllSensorsReply();
            reply.Sensors.AddRange(GetProtoSensors(request.ModelId));

            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        private IEnumerable<SensorProto> GetProtoSensors(int modelId)
        {
            return _dbContext.Sensors
                .Where(x => x.ModelId.Equals(modelId))
                .Select(x => new SensorProto()
                {
                    Id = x.Id.ToString(),
                    Name = x.Name,
                    ModelId = x.ModelId,
                    FunctionalArray = x.FunctionalArray,
                    IsEnabled = x.IsEnabled,
                    ExpireTime = x.ExpireTime.ToString(),
                    InitTime = x.InitTime.ToString()
                })
                .ToList();
        }

        public override async Task GetAllSensorsFunctional(GetAllSensorsFunctionalRequest request, IServerStreamWriter<GetAllSensorsFunctionalReply> responseStream, ServerCallContext context)
        {
            var reply = new GetAllSensorsFunctionalReply();
            reply.SensorsFunctional.AddRange(GetProtoSensorsFunctional());

            await responseStream.WriteAsync(reply);
            await Task.FromResult(reply);
        }

        private IEnumerable<SensorFunctionalProto> GetProtoSensorsFunctional()
        {
            return _dbContext.SensorFunctionals
                .Select(x => new SensorFunctionalProto()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description
                })
                .ToList();
        }

        public override Task<GetSensorDataReply> GetSensorData(GetSensorDataRequest request, ServerCallContext context)
        {
            return base.GetSensorData(request, context);
        }
    }
}
