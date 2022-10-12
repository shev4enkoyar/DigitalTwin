using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace Microservice.ImageManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        [HttpGet("getImage/{imageId}")]
        public IActionResult Image(string imageId)
        {
            string directory = Directory.GetCurrentDirectory();
            string path = Path.Combine(directory, "images", imageId);
            if (System.IO.File.Exists(path))
                return PhysicalFile(path, "image/jpeg");
            return NotFound($"Image not found on path: {path}");
        }
    }
}
