using Grpc.Core;
using Grpc.Net.Client;
using Microservice.FileManager.Protos;
using Microsoft.AspNetCore.Mvc;
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
    }
}
