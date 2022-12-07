using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microservice.DashboardManager.DAL.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Code { get; set; }

        [Required]
        public int SoilMoistureMin { get; set; }

        [Required]
        public int SoilMoistureMax { get; set; }

        public string TaskList { get; set; }

        [ForeignKey(nameof(ProductType))]
        public int TypeId { get; set; }

        public decimal? CurrentPrice { get; set; }

        //Relationships
        public virtual List<DigitalModel> DigitalModels { get; set; }
        public virtual List<ProductPriceHistory> ProductPriceHistory { get; set; }
        public virtual ProductType ProductType { get; set; }
    }
}
