using Grpc.Core;
using Grpc.Net.Client;
using Microservice.FileManager.Protos;
using Microservice.WebClient.Protos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;
using Microservice.DashboardManager;
using System.Collections;
using System.Text;
using Microservice.MapManager.Protos;
using System.Globalization;

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
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Files,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler });

            var client = new FileService.FileServiceClient(channel);

            using var call = client.GetPageFiles(new PageFileRequest() { ModelId = modelId, SectionName = sectionName });
            GetPageFileReply response = null;
            while (await call.ResponseStream.MoveNext())
            {
                response = call.ResponseStream.Current;
            }
            return response.Files;
        }

        [HttpGet("add_page")]
        public bool AddPageFile(int modelId, string name, string link, string extension, string sectionName)
        {
            //TODO Change IP route
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Files,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler });

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
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Files,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler });

            var client = new FileService.FileServiceClient(channel);
            var call = client.RemovePageFile(new RemovePageRequest()
            {
                ModelId = modelId,
                FileGuid = fileGuid
            });

            return call.Status;
        }

        [HttpGet("create")]
        public async Task<CsvFileReply> CreateAsync(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Files,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler });

            var clientFile = new FileService.FileServiceClient(channel);
  
          
            List<CsvFileTaskData> taskData = GetTasksByModelId(modelId).Result
                .Select(x =>
                {
                    var transportData = x.TransportList.Split(';').Select(x => GetTransportById(int.Parse(x.Trim()))).ToList();
                    
                    StringBuilder transports = new StringBuilder();
                    transportData.ForEach(x => transports.Append($"{x.Brand} "));

                    double tractorDriverNum = 0;
                    double staffWorkerNum = 0;
                    transportData.ForEach(y =>
                    {
                        var gradesAndCounts = y.Staff.Split('/');
                        var grade = gradesAndCounts[0].Trim().Split(";");
                        var workerCounts = gradesAndCounts[1].Trim().Split(";").Select(y => double.Parse(y.Trim())).ToArray();
                        for (int i = 0; i < grade.Length; i++)
                        {
                            if (grade[i].Trim().Equals("Тракторист"))
                                tractorDriverNum += workerCounts[i];
                            else
                                staffWorkerNum += workerCounts[i];
                        }
                    });

                    return new CsvFileTaskData()
                    {
                        Deadline = (DateTime.ParseExact(x.EndDate, "MM/dd/yyyy", CultureInfo.CurrentCulture) - DateTime.ParseExact(x.StartDate, "MM/dd/yyyy", CultureInfo.CurrentCulture)).TotalDays.ToString(),
                        Name = x.Name,
                        PhysicalHectares = 15, // Отредактировать статичную часть
                        StandartHectares = 20, // Отредактировать статичную часть
                        StaffTractorDriverNum = tractorDriverNum,
                        StaffWorkerNum = staffWorkerNum,
                        TransportName = transports.ToString(),
                    };
                }).ToList();

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

            return response;
        }

        private async Task<IEnumerable<ModelTask>> GetTasksByModelId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.ModelTask,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
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
            return response.Tasks;
        }

        private TransportProto GetTransportById(int transportId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );
            var client = new TransportService.TransportServiceClient(channel);
            var reply = client.GetTransportById(new GetTransportByIdRequest { Id = transportId });
            return reply.Transport;
        }

        private async Task<double> GetProductAreaByMapId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Map,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );
            var client = new MapService.MapServiceClient(channel);
            var reply = await client.GetMapAreaAsync(new GetMapAreaRequest { ModelId = modelId });
            return reply.Area;
        }

        private async Task<string> GetProductByMapId(int modelId)
        {
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Dashboard,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler }
            );
            var client = new ProductService.ProductServiceClient(channel);
            var reply = await client.GetProductByModelIdAsync(new GetProductByModelIdRequest { ModelId = modelId });
            return reply.Name;
        }
    }
}
