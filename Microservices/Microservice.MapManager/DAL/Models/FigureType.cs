using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.MapManager.DAL.Models
{
    public class FigureType
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Type { get; set; }

        //Relationships

        public virtual List<FigureCategory> FigureCategories { get; set; }
    }
}
