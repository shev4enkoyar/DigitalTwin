using System.Collections.Generic;

namespace Gateway.Models.SubModels
{
    public class FullSubscriptionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public IEnumerable<string> Functions { get; set; }
    }
}
