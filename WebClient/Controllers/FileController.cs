using Microservice.FileManager.Protos;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
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
            IEnumerable<PageFileProto> result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/file/get_pages?modelId={modelId}&sectionName={sectionName}");
            if (response.IsSuccessStatusCode)
            {
                var json = response.Content.ReadAsStringAsync().Result;
                result = JsonConvert.DeserializeObject<IEnumerable<PageFileProto>>(json);
            }
            return result;
        }

        [HttpGet("download/document/{guidFile}")]
        public IActionResult DownloadDocument(string guidFile, string extension)
        {
            string windowsPath = @"C:\ProgramData\document";
            string linuxPath = @"/root/Project/Files/documents";
            byte[] byteArray = GetDocumentByteArray(Path.Combine(windowsPath, guidFile + extension));
            if (byteArray == null)
                return BadRequest();

            return new FileContentResult(byteArray, "application/octet-stream");
        }

        private byte[] GetDocumentByteArray(string file)
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
    }
}
