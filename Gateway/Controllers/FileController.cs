using Grpc.Core;
using Grpc.Net.Client;
using Microservice.DashboardManager;
using Microservice.FileManager.Protos;
using Microservice.MapManager.Protos;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Gateway.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        [HttpGet("get_pages")]
        public async Task<IEnumerable<PageFileProto>> GetAllPageFiles(int modelId, string sectionName)
        {
            //TODO Change IP route
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Files,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var client = new FileService.FileServiceClient(channel);

            using var call = client.GetPageFiles(new PageFileRequest() { ModelId = modelId, SectionName = sectionName });
            GetPageFileReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }
            return response?.Files;
        }

        [HttpGet("add_page")]
        public bool AddPageFile(int modelId, string name, string link, string extension, string sectionName)
        {
            //TODO Change IP route
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Files,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var client = new FileService.FileServiceClient(channel);
            var call = client.AddPageFile(new FullPageFile()
            {
                ModelId = modelId,
                Name = name,
                Link = link,
                Extension = extension,
                SectionName = sectionName
            });

            return call.Status;
        }

        [HttpGet("remove_page")]
        public bool RemovePageFile(int modelId, string fileGuid)
        {
            //TODO Change IP route
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Files,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var client = new FileService.FileServiceClient(channel);
            var call = client.RemovePageFile(new RemovePageRequest()
            {
                ModelId = modelId,
                FileGuid = fileGuid
            });

            return call.Status;
        }

        [HttpGet("create")]
        public Task<CsvFileReply> CreateAsync(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Files,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler });

            var clientFile = new FileService.FileServiceClient(channel);


            var taskData = GetTasksByModelId(modelId).Result
                .Select(x => GetCsvFileTaskDataByModelTask(x))
                .ToList();

            var productData = GetProductByMapId(modelId).Result.Split(';');
            var csvRequest = new CsvFileRequest()
            {
                ModelId = modelId,
                Cultura = productData[0],
                Sort = productData[1],
                Area = GetProductAreaByMapId(modelId).Result,
                Density = 11.1, // RANDOM
                Fraction = 12.3, // RANDOM
                Harvest = 11.3, // RANDOM
                SeedingRate = 11, // RANDOM
                WeightStages = 11, // RANDOM
            };
            csvRequest.TaskData.AddRange(taskData);

            var response = clientFile.CreateTechCsv(csvRequest);

            return Task.FromResult(response);
        }

        private CsvFileTaskData GetCsvFileTaskDataByModelTask(ModelTask modelTask)
        {
            var transportData = modelTask.TransportList.Split(';').Select(s => GetTransportById(int.Parse(s.Trim()))).ToList();

            var transports = new StringBuilder();
            transportData.ForEach(transportProto => transports.Append($"{transportProto.Brand} "));

            double tractorDriverNum = 0;
            double staffWorkerNum = 0;
            transportData.ForEach(y =>
            {
                var gradesAndCounts = y.Staff.Split('/');
                var grade = gradesAndCounts[0].Trim().Split(";");
                var workerCounts = gradesAndCounts[1].Trim().Split(";").Select(s => double.Parse(s.Trim())).ToArray();
                for (var i = 0; i < grade.Length; i++)
                {
                    if (grade[i].Trim().Equals("Тракторист"))
                        tractorDriverNum += workerCounts[i];
                    else
                        staffWorkerNum += workerCounts[i];
                }
            });

            return new CsvFileTaskData()
            {
                Deadline = (DateTime.ParseExact(modelTask.EndDate, "MM/dd/yyyy", CultureInfo.CurrentCulture) - DateTime.ParseExact(modelTask.StartDate, "MM/dd/yyyy", CultureInfo.CurrentCulture)).TotalDays.ToString(),
                Name = modelTask.Name,
                PhysicalHectares = 15, // Отредактировать статичную часть
                StandartHectares = 20, // Отредактировать статичную часть
                StaffTractorDriverNum = tractorDriverNum,
                StaffWorkerNum = staffWorkerNum,
                TransportName = transports.ToString(),
            };
        }

        private async Task<IEnumerable<ModelTask>> GetTasksByModelId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );

            SendReply response = null;
            using (var call = new ModelTaskService.ModelTaskServiceClient(channel)
                .GetTasks(new SendRequest { ModelId = modelId }))
            {
                while (await call.ResponseStream.MoveNext())
                {
                    response = call.ResponseStream.Current;
                }
            }
            return response?.Tasks;
        }

        private TransportProto GetTransportById(int transportId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );
            var client = new TransportService.TransportServiceClient(channel);
            var reply = client.GetTransportById(new GetTransportByIdRequest { Id = transportId });
            return reply.Transport;
        }

        private async Task<double> GetProductAreaByMapId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Map,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );
            var client = new MapService.MapServiceClient(channel);
            var reply = await client.GetMapAreaAsync(new GetMapAreaRequest { ModelId = modelId });
            return reply.Area;
        }

        private async Task<string> GetProductByMapId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIp.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = SharedTools.GetDefaultHttpHandler }
            );
            var client = new ProductService.ProductServiceClient(channel);
            var reply = await client.GetProductByModelIdAsync(new GetProductByModelIdRequest { ModelId = modelId });
            return reply.Name;
        }
    }
}
