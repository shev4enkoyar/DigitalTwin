using System;
using System.ComponentModel.DataAnnotations;

namespace Microservice.RecommendationManager.DAL.Models
{
    public class Recommendation
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string ForecastEventText { get; set; }
        [Required]
        public string RecommendationText { get; set; }
        [Required]
        public int ModelId { get; set; }
        [Required]
        public DateTime CreateDate { get; set; }
    }
}
