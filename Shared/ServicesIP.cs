using System;

namespace Shared
{
    public static class ServicesIP
    {
        private static readonly string image;
        private static readonly string internetOfThings = "";

        public static string Dashboard { get; } = "https://localhost:49162";
        public static string Map { get; } = "https://localhost:49165";
        public static string Subscription { get; } = "https://host.docker.internal:49169/";
        public static string Image => throw new NotImplementedException();
        public static string InternetOfThings => throw new NotImplementedException();
    }
}
