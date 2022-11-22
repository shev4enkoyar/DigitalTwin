using Microservice.FileManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using WebClient.Controllers.Base;

namespace WebClient.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : CustomControllerBase
    {
        public async Task<IEnumerable<PageFileProto>> GetAllPagesAsync(int modelId, string sectionName)
        {
            await CreateDocuments("techcard", modelId);

            var response = await ConnectionClient.GetAsync($"api/file/get_pages?modelId={modelId}&sectionName={sectionName}");
            if (!response.IsSuccessStatusCode) return null;

            var json = response.Content.ReadAsStringAsync().Result;
            var result = JsonConvert.DeserializeObject<IEnumerable<PageFileProto>>(json);
            return result;
        }

        [HttpGet("download/document/{guidFile}")]
        public IActionResult DownloadDocument(string guidFile)
        {
            var dirPath = Path.Combine("/", "root", "Project", "Files", "documents");
            var byteArray = GetDocumentByteArray(Path.Combine(dirPath, guidFile));
            if (byteArray == null)
                return BadRequest();

            return new FileContentResult(byteArray, "application/octet-stream");
        }

        private static byte[] GetDocumentByteArray(string file)
        {
            if (!System.IO.File.Exists(file))
                return null;

            try
            {
                return System.IO.File.ReadAllBytes(file);
            }
            catch (Exception)
            {
                return null;
            }
        }


        private async Task<bool> CreateDocuments(string documentType, int modelId)
        {
            switch (documentType)
            {
                case "techcard":
                    return await CreateTechCardDocumentAsync(modelId);
                default:
                    return false;
            }
        }

        private async Task<bool> CreateTechCardDocumentAsync(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/file/create?modelId={modelId}");
            return response.IsSuccessStatusCode;
        }
    }
}
