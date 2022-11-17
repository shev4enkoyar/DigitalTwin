using System.Collections.Generic;

namespace WebClient.Util
{
    public class TaskJson
    {
        public class Details
        {
            public List<string> dates { get; set; }
            public List<string> status { get; set; }
            public List<Expense> Expenses { get; set; }
        }

        public class Expense
        {
            public Fuel Fuel { get; set; }
            public SomeInfo SomeInfo { get; set; }
        }

        public class Fuel
        {
            public double? num { get; set; }
            public double? price { get; set; }
        }

        public class Resources
        {
            public List<string> transport { get; set; }
            public List<string> personal { get; set; }
        }

        public class Root
        {
            public int taskId { get; set; }
            public string taskName { get; set; }
            public string curDate { get; set; }
            public string role { get; set; }
            public Resources Resources { get; set; }
            public Details Details { get; set; }
        }

        public class SomeInfo
        {
            public double? num { get; set; }
            public double? price { get; set; }
        }
    }
}
