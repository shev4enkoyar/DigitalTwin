using System;

namespace Shared
{
    /// <summary>
    /// Class containing microservices IP
    /// </summary>
    public static class MicroservicesIP
    {
        private static readonly string dashboard = "https://localhost:49162";
        private static readonly string map = "https://localhost:49165";
        private static readonly string subscription = "https://host.docker.internal:49169/";
        private static readonly string image = null;
        private static readonly string internetOfThings = null;

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
        /// <value>https://host.docker.internal:49169/</value>
        /// <exception cref="ArgumentNullException"/>
        public static string Subscription => CheckEmptyIP(subscription);

        /// <summary>ImageManager IP</summary>
        /// <value>exception</value>
        /// <exception cref="ArgumentNullException"/>
        public static string Image => CheckEmptyIP(image);

        /// <summary>InternetOfThingsManager IP</summary>
        /// <value>exception</value>
        /// <exception cref="ArgumentNullException"/>
        public static string InternetOfThings => CheckEmptyIP(internetOfThings);

        #endregion

        private static string CheckEmptyIP(string ip)
        {
            if (string.IsNullOrEmpty(ip))
                throw new ArgumentException("Empty IP");
            return ip;
        }
    }
}
