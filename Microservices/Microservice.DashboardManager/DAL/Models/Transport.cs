using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.DashboardManager.DAL.Models
{
    public class Transport
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Brand { get; set; }

        [Required]
        public string StaffName { get; set; }

        [Required]
        public string StaffNum { get; set; }

        //Relationships

        public virtual List<ModelTransport> ModelTransports { get; set; }
    }
}
