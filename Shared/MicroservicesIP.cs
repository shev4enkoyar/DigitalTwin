using System;
using System.Net.Http;

namespace Shared
{
    /// <summary>
    /// Class containing microservices IP
    /// </summary>
    public static class MicroservicesIp
    {
        private const string ConstGatewayIp = "http://localhost:5100";

        #region Properties

        /// <summary>Gateway IP</summary>
        /// <value>http://localhost:5100</value>
        /// <exception cref="ArgumentNullException"/>
        public static string GatewayIp => CheckEmptyIp(ConstGatewayIp);

        #endregion

        public static class External
        {
            #region Constants

            private const string RecommendationIp = "https://localhost:49180";
            private const string DashboardIp = "https://localhost:49162";
            private const string FilesIp = "https://localhost:49177";
            private const string MapIp = "https://localhost:49165";
            private const string ModelTaskIp = "https://localhost:49171";
            private const string ForecastIp = "https://localhost:49173";
            private const string WeatherIp = "https://localhost:49175";
            private const string SubscriptionIp = "https://localhost:49169";
            private const string ImageIp = "";
            private const string InternetOfThingsIp = "https://localhost:49165";

            #endregion

            #region Properties

            /// <summary>RecommendationManager IP</summary>
            /// <value>https://localhost:49180</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Recommendation => CheckEmptyIp(RecommendationIp);

            /// <summary>DashboardManager IP</summary>
            /// <value>https://localhost:49162</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Dashboard => CheckEmptyIp(DashboardIp);

            /// <summary>DashboardManager IP</summary>
            /// <value>null</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Files => CheckEmptyIp(FilesIp);

            /// <summary>MapManager IP</summary>
            /// <value>https://localhost:49165</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Map => CheckEmptyIp(MapIp);

            /// <summary>SubscriptionManager IP</summary>
            /// <value>https://localhost:49169/</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Subscription => CheckEmptyIp(SubscriptionIp);

            /// <summary>ImageManager IP</summary>
            /// <value>exception</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Image => CheckEmptyIp(ImageIp);

            /// <summary>InternetOfThingsManager IP</summary>
            /// <value>https://localhost:49165</value>
            /// <exception cref="ArgumentNullException"/>
            public static string InternetOfThings => CheckEmptyIp(InternetOfThingsIp);

            /// <summary>ModelTaskManager IP</summary>
            /// <value>https://localhost:49171</value>
            /// <exception cref="ArgumentNullException"/>
            public static string ModelTask => CheckEmptyIp(ModelTaskIp);

            /// <summary>ForecastManager IP</summary>
            /// <value>https://localhost:49173</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Forecast => CheckEmptyIp(ForecastIp);

            /// <summary>WeatherManager IP</summary>
            /// <value>https://localhost:49175</value>
            /// <exception cref="ArgumentNullException"/>
            public static string Weather => CheckEmptyIp(WeatherIp);

            #endregion
        }

        #region Methods

        private static string CheckEmptyIp(string ip)
        {
            if (string.IsNullOrEmpty(ip))
                throw new ArgumentException("Empty IP");
            return ip;
        }

        #endregion
    }
}
