using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microservice.DashboardManager.DAL.Models
{
    public class ModelTransport
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(DigitalModel))]
        public int DigitalModelId { get; set; }

        [Required]
        [ForeignKey(nameof(Transport))]
        public int TransportId { get; set; }

        //Relationships

        public virtual DigitalModel DigitalModel { get; set; }

        public virtual Transport Transport { get; set; }
    }
}
