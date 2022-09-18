using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.MapManager.DAL.Models
{
    [Index(nameof(HEX), IsUnique = true)]
    public class Color
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string HEX { get; set; }

        //Relationships

        public virtual List<FigureCategory> FigureCategories { get; set; }
    }
}
