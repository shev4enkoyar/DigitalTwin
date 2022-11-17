namespace WebClient.Models.SubModels
{
    public class ModelTask
    {
        public int Id { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string TaskType { get; set; }
        public bool IsComplete { get; set; }
        public string Name { get; set; }
        public string TransportList { get; set; }

    }
}
