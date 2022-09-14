using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class DigitalModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        //Relationships
        public virtual User User { get; set; }

        public virtual List<Figure> Figures { get; set; }

        public virtual Product Product { get; set; }

        public virtual List<ActivatedExtension> ActivatedExtensions { get; set; }
    }
}
