using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Microservice.MapManager.DAL.Models
{
    public class Figure
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Map))]
        public int MapId { get; set; }

        [Required]
        [ForeignKey(nameof(FigureCategory))]
        public int CategoryId { get; set; }

        [Required]
        public string Points { get; set; }

        //Relationships

        public virtual Map Map { get; set; }

        public virtual FigureCategory FigureCategory { get; set; }
    }
}
