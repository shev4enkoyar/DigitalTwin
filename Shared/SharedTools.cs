using System;
using System.Net.Http;

namespace Shared
{
    public static class SharedTools
    {
        public static HttpClientHandler GetDefaultHttpHandler => new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = HttpClientHandler.DangerousAcceptAnyServerCertificateValidator
        };

        public static DateTime ConvertFromJsonDate(DateTime jsonDate)
        {
            return new DateTime(jsonDate.Year, jsonDate.Month, jsonDate.Day);
        }

    }
}
