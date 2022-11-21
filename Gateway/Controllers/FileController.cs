using Grpc.Core;
using Grpc.Net.Client;
using Microservice.FileManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Shared;
using System.Collections.Generic;
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
        public CsvFileReply Create(int modelId, string fileGuid)
        {
            //TODO Change IP route
            using var channel = GrpcChannel.ForAddress(MicroservicesIP.External.Files,
                new GrpcChannelOptions { HttpHandler = MicroservicesIP.DefaultHttpHandler });

            var client = new FileService.FileServiceClient(channel);
            var taskData = new List<CsvFileTaskData>() 
            { 
                new CsvFileTaskData() { Deadline = "11/12/2000", Name = "some", PhysicalHectares = 15, StaffTractorDriverNum = 16, StaffWorkerNum = 3, StandartHectares = 20, TransportName = "some machine" },
                new CsvFileTaskData() { Deadline = "11/13/2000", Name = "some1", PhysicalHectares = 15, StaffTractorDriverNum = 16, StaffWorkerNum = 3, StandartHectares = 20, TransportName = "some machine" }
            };
            var response = client.CreateTechCsv(new CsvFileRequest()
            {
                Area = 12.4,
                Cultura = "test",
                Density = 11.1,
                Fraction = 12.3,
                Harvest = 11.3,
                SeedingRate = 11,
                Sort = "some",
                WeightStages = 11
            });

            return response;
        }
    }
}
