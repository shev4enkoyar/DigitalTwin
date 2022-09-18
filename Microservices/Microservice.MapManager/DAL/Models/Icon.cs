using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.MapManager.DAL.Models
{
    [Index(nameof(Source), IsUnique = true)]
    public class Icon
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Source { get; set; }

        //Relationships
        public virtual List<FigureCategory> FigureCategories { get; set; }
    }
}
