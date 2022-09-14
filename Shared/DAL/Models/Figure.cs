using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Figure
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(DigitalModel))]
        public int ModelId { get; set; }
        [Required]
        [ForeignKey(nameof(FigureCategory))]
        public int CategoryId { get; set; }
        [Required]
        [ForeignKey(nameof(Color))]
        public int ColorId { get; set; }
        [Required]
        [ForeignKey(nameof(Icon))]
        public int IconId { get; set; }
        [Required]
        public string Points { get; set; }
        [Required]
        public bool IsUnique { get; set; }

        //Relationships
        public virtual DigitalModel DigitalModel { get; set; }

        public virtual FigureCategory FigureCategory { get; set; }

        public virtual Color Color{ get; set; }

        public virtual Icon Icon { get; set; }
    }
}
