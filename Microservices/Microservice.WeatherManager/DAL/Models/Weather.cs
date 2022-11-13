using System;

namespace Microservice.WeatherManager.DAL.Models
{
    public class Weather
    {
        public int Id { get; set; }

        public int ModelId { get; set; }

        public DateTime Date { get; set; }

        /// <summary>
        /// Units in °C
        /// </summary>
        public double TemperatureAvg { get; set; }

        /// <summary>
        /// Units in mm
        /// </summary>
        public double PrecipitationAvg { get; set; }

        /// <summary>
        /// Units in m³/m³
        /// </summary>
        public double SoilMoistureAvg { get; set; }

        public double EvapotranspirationAvg { get; set; }
    }
}
