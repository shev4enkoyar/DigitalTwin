using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.ModelTaskManager.DAL.Models
{
    public class Task
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int ModelId { get; set; }
        [Required]
        public DateTime StartDate { get; set; }
        [Required]
        public DateTime EndDate { get; set; }
        [Required]
        public string TransportList { get; set; }
        [Required]
        public string Type { get; set; }

        //Relationships
        public virtual List<Detail> Details { get; set; }
    }
}
