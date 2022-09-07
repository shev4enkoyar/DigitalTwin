using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Extension
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public bool ForUser { get; set; }

        [Required]
        public decimal Price { get; set; }

        //Relationships
        public virtual List<ActivatedExtension> ActivatedExtensions { get; set; }
    }
}
