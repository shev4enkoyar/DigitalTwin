using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Map
    {
        [Required]
        public int Id { get; set; }

        //Relationships

        public virtual DigitalModel DigitalModel { get; set; }

        public virtual List<Figure> Figures { get; set; }
    }
}
