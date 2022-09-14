using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class FigureCategory
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Color))]
        public int ColorId { get; set; }

        [Required]
        [ForeignKey(nameof(Icon))]
        public int IconId { get; set; }

        [Required]
        [ForeignKey(nameof(FigureType))]
        public int FigureTypeId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsUnique { get; set; }

        //Relationships

        public virtual List<Figure> Figures { get; set; }
        public virtual Icon Icon { get; set; }
        public virtual Color Color { get; set; }
        public virtual FigureType FigureType { get; set; }
    }
}
