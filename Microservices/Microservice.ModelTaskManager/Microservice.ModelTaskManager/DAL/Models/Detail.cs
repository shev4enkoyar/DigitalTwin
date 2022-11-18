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

        /// <summary>
        /// Перечисление топлива. Зависит от количества транспорта на задаче
        /// </summary>
        /// <example>литр;цена,литр;цена</example>
        [Required]
        public string Fuel { get; set; }

        public string Seeds { get; set; }

        public string Fertilizers { get; set; }

        public string Pesticides { get; set; }

        //Relationships
        public virtual Task Task { get; set; }
    }
}
