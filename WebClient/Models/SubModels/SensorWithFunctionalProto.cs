using System.Collections.Generic;

namespace WebClient.Models.SubModels
{
    public class SensorWithFunctionalProto
    {
        public string Id { get; set; }
        public int ModelId { get; set; }
        public string Name { get; set; }
        public bool IsEnabled { get; set; }
        public string InitTime { get; set; }
        public string ExpireTime { get; set; }
        public IEnumerable<SensorFunctionalProto> FunctionalProtos { get; set; }
    }
}
