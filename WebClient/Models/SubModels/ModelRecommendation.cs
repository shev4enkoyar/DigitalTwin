using System;

namespace WebClient.Models.SubModels
{
    public class ModelRecommendation
    {
        public int Id { get; set; }
        public string ForecastEventText { get; set; }
        public string RecommendationText { get; set; }
        public string CreateDate { get; set; }
    }
}
