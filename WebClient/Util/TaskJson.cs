using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace WebClient.Util
{
    public class TaskJson
    {
        public class Details
        {
            [JsonPropertyName("dates")]
            public List<string> Dates { get; set; }

            [JsonPropertyName("status")]
            public List<string> Status { get; set; }

            [JsonPropertyName("Expenses")]
            public List<Expense> Expenses { get; set; }
        }

        public class Expense
        {
            [JsonPropertyName("Fuel")]
            public List<Fuel> Fuel { get; set; }

            [JsonPropertyName("Seeds")]
            public Seeds Seeds { get; set; }

            [JsonPropertyName("Fertilizers")]
            public Fertilizers Fertilizers { get; set; }

            [JsonPropertyName("Pesticides")]
            public Pesticides Pesticides { get; set; }
        }

        public class Fertilizers
        {
            [JsonPropertyName("num")]
            public double? Num { get; set; }

            [JsonPropertyName("price")]
            public double? Price { get; set; }
        }

        public class Fuel
        {
            [JsonPropertyName("num")]
            public double? Num { get; set; }

            [JsonPropertyName("price")]
            public double? Price { get; set; }
        }

        public class Pesticides
        {
            [JsonPropertyName("num")]
            public double? Num { get; set; }

            [JsonPropertyName("price")]
            public double? Price { get; set; }
        }

        public class Resources
        {
            [JsonPropertyName("transport")]
            public List<string> Transport { get; set; }

            [JsonPropertyName("personal")]
            public List<string> Personal { get; set; }
        }

        public class Root
        {
            [JsonPropertyName("taskId")]
            public int TaskId { get; set; }

            [JsonPropertyName("taskName")]
            public string TaskName { get; set; }

            [JsonPropertyName("curDate")]
            public string CurDate { get; set; }

            [JsonPropertyName("role")]
            public string Role { get; set; }

            [JsonPropertyName("Resources")]
            public Resources Resources { get; set; }

            [JsonPropertyName("Details")]
            public Details Details { get; set; }
        }

        public class Seeds
        {
            [JsonPropertyName("num")]
            public double? Num { get; set; }

            [JsonPropertyName("price")]
            public double? Price { get; set; }
        }
    }
}
