using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microservice.ModelTaskManager.DAL.Models
{
    public class Detail
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [ForeignKey(nameof(Task))]
        public int TaskId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string Status { get; set; }
        [Required]
        public string Fuel { get; set; }
        [Required]
        public string SomeInfo { get; set; }

        //Relationships
        public virtual Task Task { get; set; }
    }
}
