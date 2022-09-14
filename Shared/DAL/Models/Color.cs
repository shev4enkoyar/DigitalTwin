using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Xml.Linq;

namespace DAL.Models
{
    [Index(nameof(HEX), IsUnique = true)]
    public class Color
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string HEX { get; set; }

        //Relationships

        public virtual List<Figure> Figures { get; set; }
    }
}
