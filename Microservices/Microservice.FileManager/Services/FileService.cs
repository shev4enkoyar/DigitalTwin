using Grpc.Core;
using Microservice.FileManager.DAL;
using Microservice.FileManager.DAL.Models;
using Microservice.FileManager.Protos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Microservice.FileManager.Services
{
    public class FileService : Protos.FileService.FileServiceBase
    {
        private ApplicationContext DbContext { get; }

        public FileService(ApplicationContext dbContext)
        {
            DbContext = dbContext;
        }

        public override async Task GetPageFiles(PageFileRequest request, IServerStreamWriter<GetPageFileReply> responseStream, ServerCallContext context)
        {
            GetPageFileReply pageFileReply = new GetPageFileReply();

            IEnumerable<PageFileProto> protoFiles;
            if (request.SectionName.ToUpper().Equals("ALL"))
                protoFiles = GetProtoPageFiles(request.ModelId);
            else
                protoFiles = GetProtoPageFiles(request.ModelId, request.SectionName);
            pageFileReply.Files.AddRange(protoFiles);

            await responseStream.WriteAsync(pageFileReply);
            await Task.FromResult(pageFileReply);
        }

        private IEnumerable<PageFileProto> GetProtoPageFiles(int modelId)
        {
            return DbContext.Papers
                .Include(x => x.Section)
                .Where(x => x.ModelId.Equals(modelId))
                .Select(x => new PageFileProto()
                {
                    Date = x.CreateDate.ToString(),
                    Name = x.Name,
                    FileGuid = x.Id.ToString(),
                    Extension = x.Extension,
                    Link = x.Link
                })
                .ToList();
        }

        private IEnumerable<PageFileProto> GetProtoPageFiles(int modelId, string sectionName)
        {
            return DbContext.Papers
                .Include(x => x.Section)
                .Where(x => x.ModelId.Equals(modelId) && x.Section.Name.Equals(sectionName))
                .Select(x => new PageFileProto()
                {
                    Date = x.CreateDate.ToString(),
                    Name = x.Name,
                    FileGuid = x.Id.ToString(),
                    Extension = x.Extension,
                    Link = x.Link
                })
                .ToList();
        }

        public override Task<PageFileStatus> AddPageFile(FullPageFile request, ServerCallContext context)
        {
            var section = DbContext.Sections
                .FirstOrDefault(x => x.Name.ToUpper().Equals(request.SectionName.ToUpper()));
            if (section == null)
                return Task.FromResult(new PageFileStatus() { Status = false });

            Paper newFile = new Paper()
            {
                CreateDate = DateTime.UtcNow,
                ModelId = request.ModelId,
                Name = request.Name,
                Extension = request.Extension,
                Link = request.Link,
                SectionId = section.Id,
            };

            DbContext.Papers.Add(newFile);
            DbContext.SaveChanges();

            return Task.FromResult(new PageFileStatus() { Status = true, FileGuid = newFile.Id.ToString() });
        }

        public override Task<PageFileStatus> RemovePageFile(RemovePageRequest request, ServerCallContext context)
        {
            PageFileStatus fileStatus = new PageFileStatus()
            {
                Status = false
            };

            if (!Guid.TryParse(request.FileGuid, out Guid fileGuid))
                return Task.FromResult(fileStatus);

            if (!RemovePageFile(request.ModelId, fileGuid))
                return Task.FromResult(fileStatus);

            fileStatus.Status = true;
            return Task.FromResult(fileStatus);
        }

        private bool RemovePageFile(int modelId, Guid fileGuid)
        {
            var file = DbContext.Papers
                .FirstOrDefault(x => x.ModelId.Equals(modelId) && x.Id.Equals(fileGuid));
            if (file == null)
                return false;

            DbContext.Papers.Remove(file);
            DbContext.SaveChanges();
            return true;
        }
    }
}