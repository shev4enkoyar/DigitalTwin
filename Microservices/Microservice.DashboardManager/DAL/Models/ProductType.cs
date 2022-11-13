using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.DashboardManager.DAL.Models
{
    public class ProductType
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        //Relationships
        public virtual List<Product> Products { get; set; }
    }
}