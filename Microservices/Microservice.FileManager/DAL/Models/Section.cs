using System.Collections.Generic;

namespace Microservice.FileManager.DAL.Models
{
    public class Section
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual List<Paper> Papers { get; set; }
    }
}
