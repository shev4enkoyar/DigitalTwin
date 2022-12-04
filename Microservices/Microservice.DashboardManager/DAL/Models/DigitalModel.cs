using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

namespace Microservice.DashboardManager.DAL.Models
{
    public class DigitalModel
    {
        private int? mapId;

        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public Guid CompanyId { get; set; }

        [Required]
        [ForeignKey(nameof(Product))]
        public int ProductId { get; set; }

        public int? MapId { get => mapId == null ? -1 : mapId; set => mapId = value; }

        [Required]
        public DateTime CreateDate { get; set; }

        //Relationships

        public virtual Product Product { get; set; }

        public virtual List<ModelTransport> ModelTransports { get; set; }

        public virtual List<Worker> Workers { get; set; }
    }
}
