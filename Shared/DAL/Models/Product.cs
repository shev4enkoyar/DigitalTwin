using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
{
    [Index(nameof(Code), IsUnique = true)]
    public class Product
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Code { get; set; }

        public decimal? CurrentPrice { get; set; }

        //Relationships
        public virtual List<DigitalModel> DigitalModels { get; set; }

        public virtual List<ProductPriceHistory> ProductPriceHistory { get; set; }
    }
}
