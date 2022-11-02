using System;

namespace Microservice.InternetOfThingsManager.DAL.Models
{
    public class SensorData
    {
        public int Id { get; set; }

        public string SensorId { get; set; }

        public string Data { get; set; }
        public DateTime CreateDate { get; set; }
    }
}
