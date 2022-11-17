using Microsoft.AspNetCore.Mvc;
using Shared;
using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace WebClient.Controllers.Base
{
    public class CustomControllerBase : ControllerBase
    {
        public HttpClient ConnectionClient
        {
            get
            {
                HttpClient client = new HttpClient
                {
                    BaseAddress = new Uri(MicroservicesIP.GatewayIP)
                };
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                return client;
            }
        }
    }
}
