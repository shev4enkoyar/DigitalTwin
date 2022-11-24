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
    /// <summary>
    /// Technological map file management controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : CustomControllerBase
    {
        /// <summary>
        /// Receiving a listing of technological map documents
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <param name="sectionName">Name section</param>
        /// <returns>technological map documents</returns>
        public async Task<IEnumerable<PageFileProto>> GetAllPagesAsync(int modelId, string sectionName)
        {
            if (!await CreateDocuments("techcard", modelId))
                return null;


            var response = await ConnectionClient.GetAsync($"api/file/get_pages?modelId={modelId}&sectionName={sectionName}");
            if (!response.IsSuccessStatusCode) return null;

            var json = response.Content.ReadAsStringAsync().Result;
            var result = JsonConvert.DeserializeObject<IEnumerable<PageFileProto>>(json);
            return result;
        }

        /// <summary>
        /// File download method
        /// </summary>
        /// <param name="guidFile">File Id</param>
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
            return documentType switch
            {
                "techcard" => await CreateTechCardDocumentAsync(modelId),
                _ => false
            };
        }

        private async Task<bool> CreateTechCardDocumentAsync(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/file/create?modelId={modelId}");
            return response.IsSuccessStatusCode;
        }
    }
}
