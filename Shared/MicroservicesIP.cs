using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace Shared
{
    /// <summary>
    /// Class containing microservices IP
    /// </summary>
    public static class MicroservicesIP
    {
        private static readonly string gateway = "http://localhost:5100";

        #region Properties

        /// <summary>Gateway IP</summary>
        /// <value>http://localhost:5100</value>
        /// <exception cref="ArgumentNullException"/>
        public static string GatewayIP => CheckEmptyIP(gateway);

        public static HttpClient GatewayHttpClient
        {
            get
            {
                HttpClient client = new HttpClient
                {
                    BaseAddress = new Uri(GatewayIP)
                };
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
                return client;
            }
        }

        public static HttpClientHandler DefaultHttpHandler => new HttpClientHandler()
        {
            ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
        };

        #endregion

        public static class External
        {
            private static readonly string dashboard = "https://localhost:49162";
            private static readonly string map = "https://localhost:49165";
            private static readonly string modelTask = "https://localhost:49171";
            private static readonly string forecast = "https://localhost:49173";
            private static readonly string weather = "https://localhost:49175";
            private static readonly string subscription = "https://localhost:49169";
            private static readonly string image = null;
            private static readonly string internetOfThings = "https://localhost:49165";

            #region Properties

            /// <summary>DashboardManager IP</summary>
            /// <value>https://localhost:49162</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Dashboard => CheckEmptyIP(dashboard);

            /// <summary>MapManager IP</summary>
            /// <value>https://localhost:49165</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Map => CheckEmptyIP(map);

            /// <summary>SubscriptionManager IP</summary>
            /// <value>https://localhost:49169/</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Subscription => CheckEmptyIP(subscription);

            /// <summary>ImageManager IP</summary>
            /// <value>exception</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Image => CheckEmptyIP(image);

            /// <summary>InternetOfThingsManager IP</summary>
            /// <value>https://localhost:49165</value>
            /// <exception cref="ArgumentNullException"/>
            public static string InternetOfThings => CheckEmptyIP(internetOfThings);

            /// <summary>ModelTaskManager IP</summary>
            /// <value>https://localhost:49171</value>
            /// <exception cref="ArgumentNullException"/>
            public static string ModelTask => CheckEmptyIP(modelTask);

            /// <summary>ForecastManager IP</summary>
            /// <value>https://localhost:49173</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Forecast => CheckEmptyIP(forecast);

            /// <summary>WeatherManager IP</summary>
            /// <value>https://localhost:49175</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Weather => CheckEmptyIP(weather);

            #endregion
        }

        #region Methods

        private static string CheckEmptyIP(string ip)
        {
            if (string.IsNullOrEmpty(ip))
                throw new ArgumentException("Empty IP");
            return ip;
        }

        #endregion
    }
}
