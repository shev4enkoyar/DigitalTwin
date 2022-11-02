using System;
using System.ComponentModel.DataAnnotations;

namespace Microservice.InternetOfThingsManager.DAL.Models
{
    public class Sensor
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public int ModelId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string FunctionalArray { get; set; }

        [Required]
        public bool IsEnabled { get; set; }

        [Required]
        public DateTime InitTime { get; set; }

        [Required]
        public DateTime ExpireTime { get; set; }
    }
}