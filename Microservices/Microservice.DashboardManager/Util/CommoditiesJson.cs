using System.Text.Json.Serialization;

namespace Microservice.DashboardManager.Util
{
    public class CommoditiesJson
    {
        public class Data
        {
            [JsonPropertyName("success")]
            public bool? Success { get; set; }

            [JsonPropertyName("timestamp")]
            public int? Timestamp { get; set; }

            [JsonPropertyName("date")]
            public string Date { get; set; }

            [JsonPropertyName("base")]
            public string Base { get; set; }

            [JsonPropertyName("rates")]
            public Rates Rates { get; set; }

            [JsonPropertyName("unit")]
            public string Unit { get; set; }
        }

        public class Rates
        {
            [JsonPropertyName("CORN")]
            public double? CORN { get; set; }

            [JsonPropertyName("WHEAT")]
            public double? WHEAT { get; set; }
        }

        public class Root
        {
            [JsonPropertyName("data")]
            public Data Data { get; set; }
        }
    }
}