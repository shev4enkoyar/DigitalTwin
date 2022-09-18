using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace Microservice.DashboardManager.DAL.Models
{
    public class ProductPriceHistory
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public decimal Price { get; set; }

        //Relationships
        public virtual Product Product { get; set; }
    }
}
