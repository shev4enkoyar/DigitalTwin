using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace WebClient.Controllers.Base
{
    /// <summary>
    /// Class inherited from ControllerBase
    /// </summary>
    public class CustomControllerBase : ControllerBase
    {
        /// <summary>
        /// Client connection setting property
        /// </summary>
        public HttpClient ConnectionClient
        {
            get
            {
                var client = new HttpClient
                {
                    BaseAddress = new Uri(MicroservicesIp.GatewayIp)
                };
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                return client;
            }
        }
    }
}
