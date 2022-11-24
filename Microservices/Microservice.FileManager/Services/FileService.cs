using Grpc.Core;
using Microservice.FileManager.DAL;
using Microservice.FileManager.DAL.Models;
using Microservice.FileManager.Protos;
using Microservice.FileManager.Util;
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
            var pageFileReply = new GetPageFileReply();

            var protoFiles = request.SectionName.ToUpper().Equals("ALL")
                ? GetProtoPageFiles(request.ModelId)
                : GetProtoPageFiles(request.ModelId, request.SectionName);

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

            var newFile = new Paper()
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
            var fileStatus = new PageFileStatus()
            {
                Status = false
            };

            if (!Guid.TryParse(request.FileGuid, out var fileGuid))
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

        public override Task<CsvFileReply> CreateTechCsv(CsvFileRequest csvRequest, ServerCallContext context)
        {
            var cultura = csvRequest.Cultura;
            var sort = csvRequest.Sort;
            var area = csvRequest.Area;
            var seedingRate = csvRequest.SeedingRate;
            var fraction = csvRequest.Fraction;
            var density = csvRequest.Density;
            var harvest = csvRequest.Harvest;
            var weightStages = csvRequest.WeightStages;

            var grpcTaskData = csvRequest.TaskData.ToList();
            var taskData = new List<TechCardCsvData>
            {
                new TechCardCsvData()
                {
                    First = "Культура",
                    Second = cultura,
                    Third = "Фракция",
                    Fourth = fraction.ToString()
                },
                new TechCardCsvData()
                {
                    First = "Сорт",
                    Second = sort,
                    Third = "Густота",
                    Fourth = density.ToString()
                },
                new TechCardCsvData()
                {
                    First = "Площадь",
                    Second = area.ToString(),
                    Third = "Урожай",
                    Fourth = harvest.ToString()
                },
                new TechCardCsvData()
                {
                    First = "Норма высева",
                    Second = seedingRate.ToString(),
                    Third = "Вес этапов",
                    Fourth = weightStages.ToString()
                },
                new TechCardCsvData { Third = "Объем работ", Fifth = "Состав агрегата", Sixth = "Обслуживающий персонал" },
                new TechCardCsvData { First = "Наименование работы", Second = "Агро сроки проведения работ", Third = "В физических га", Fourth = "В эталонных га", Fifth = "Транспорт", Sixth = "Трактористов", Seventh = "Рабочие" }
            };
            taskData.AddRange(grpcTaskData.Select(x =>
                new TechCardCsvData
                {
                    First = x.Name,
                    Second = x.Deadline,
                    Third = x.PhysicalHectares.ToString(),
                    Fourth = x.StandartHectares.ToString(),
                    Fifth = x.TransportName,
                    Sixth = x.StaffTractorDriverNum.ToString(),
                    Seventh = x.StaffWorkerNum.ToString()
                }));

            var fileName = DocumentCreator.CreateCsvDocument(taskData).Result;
            var reply = new CsvFileReply
            {
                Link = $"api/file/download/document/{fileName}",
                Name = "Технологическая карта",
                Extension = "csv",
                SectionName = "Все"
            };

            DbContext.Papers.Add(new Paper()
            {
                CreateDate = new DateTime(DateTime.UtcNow.Year, DateTime.UtcNow.Month, DateTime.UtcNow.Day),
                Extension = "csv",
                Name = "Технологическая карта",
                Link = $"api/file/download/document/{fileName}",
                ModelId = csvRequest.ModelId,
                SectionId = 3
            });
            DbContext.SaveChanges();
            return Task.FromResult(reply);
        }
    }
}