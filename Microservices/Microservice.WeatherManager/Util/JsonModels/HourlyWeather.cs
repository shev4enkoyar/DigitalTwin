using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Microservice.WeatherManager.Util.JsonModels
{
    public class HourlyWeather
    {
        public class Hourly
        {
            [JsonPropertyName("time")]
            public List<string> Time { get; set; }

            [JsonPropertyName("temperature_2m")]
            public List<double> Temperature2m { get; set; }

            [JsonPropertyName("precipitation")]
            public List<double> Precipitation { get; set; }

            [JsonPropertyName("evapotranspiration")]
            public List<double> Evapotranspiration { get; set; }

            [JsonPropertyName("soil_moisture_0_1cm")]
            public List<double> SoilMoisture01cm { get; set; }
        }

        public class HourlyUnits
        {
            [JsonPropertyName("time")]
            public string Time { get; set; }

            [JsonPropertyName("temperature_2m")]
            public string Temperature2m { get; set; }

            [JsonPropertyName("precipitation")]
            public string Precipitation { get; set; }

            [JsonPropertyName("evapotranspiration")]
            public string Evapotranspiration { get; set; }

            [JsonPropertyName("soil_moisture_0_1cm")]
            public string SoilMoisture01cm { get; set; }
        }

        public class Root
        {
            [JsonPropertyName("latitude")]
            public double Latitude { get; set; }

            [JsonPropertyName("longitude")]
            public double Longitude { get; set; }

            [JsonPropertyName("generationtime_ms")]
            public double GenerationtimeMs { get; set; }

            [JsonPropertyName("utc_offset_seconds")]
            public int UtcOffsetSeconds { get; set; }

            [JsonPropertyName("timezone")]
            public string Timezone { get; set; }

            [JsonPropertyName("timezone_abbreviation")]
            public string TimezoneAbbreviation { get; set; }

            [JsonPropertyName("elevation")]
            public double Elevation { get; set; }

            [JsonPropertyName("hourly_units")]
            public HourlyUnits HourlyUnits { get; set; }

            [JsonPropertyName("hourly")]
            public Hourly Hourly { get; set; }
        }
    }
}
