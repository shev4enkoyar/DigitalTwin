using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace Microservice.DashboardManager.DAL.Models
{
    public class DigitalModel
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }

        public int MapId { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        //Relationships

        public virtual Product Product { get; set; }
    }
}
