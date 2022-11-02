using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.MapManager.DAL.Models
{
    [Index(nameof(ModelId), IsUnique = true)]
    public class Map
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public int ModelId { get; set; }
        
        public string ProductArea { get; set; }

        public string Cadaster { get; set; }

        //Relationships

        public virtual List<Figure> Figures { get; set; }
    }
}
