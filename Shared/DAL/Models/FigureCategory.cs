using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class FigureCategory
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        //Relationships

        public virtual List<Figure> Figures { get; set; }
    }
}
