using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    [Index(nameof(Source), IsUnique = true)]
    public class Icon
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Source { get; set; }

        //Relationships

        public virtual List<Figure> Figures { get; set; }
    }
}
