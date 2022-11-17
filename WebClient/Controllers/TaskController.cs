using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Threading.Tasks;
using WebClient.Models.SubModels;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        [HttpGet("get_all/{modelId}")]
        public async Task<IEnumerable<ModelTask>> GetAllByModelId(int modelId)
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            IEnumerable<ModelTask> result = null;
            HttpResponseMessage response = await client.GetAsync($"api/task/get_all/{modelId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<ModelTask>>(json);

            }
            return result;
        }

        [HttpGet("get_details/{taskId}")]
        public async Task<Root> GetDetailsByTaskId(int taskId)
        {
            ModelTask task = await GetTaskById(taskId);
            List<TransportProto> transports = new List<TransportProto>();
            foreach (string item in task.TransportList.Split(";"))
            {
                var transport = await GetTransportById(int.Parse(item));
                transports.Add(transport);
            }
            IEnumerable<DetailProto> detailsDb = await GetDetailsDataByTaskId(taskId);

            Resources resources = new Resources() {
                personal = transports.Select(x => x.Staff).ToList(),
                transport = transports.Select(x => $"{x.Name} {x.Brand}").ToList()
            };
            Details details = new Details() { 
                dates = detailsDb.Select(x => x.Date).ToList(),
                status = detailsDb.Select(x => x.Status).ToList(),
                Expenses = detailsDb.Select(x => new Expense() 
                { 
                    Fuel = x.Fuel.IsNullOrEmpty() 
                    ? new Fuel() { price = null, num = null } 
                    : new Fuel() { num = double.Parse(x.Fuel.Split(";")[0]), price = double.Parse(x.Fuel.Split(";")[1]) },
                    SomeInfo = x.SomeInfo.IsNullOrEmpty()
                    ? new SomeInfo() {  price = null, num = null }
                    : new SomeInfo() { num = double.Parse(x.SomeInfo.Split(";")[0]), price = double.Parse(x.SomeInfo.Split(";")[1]) }
                }).ToList()
            };
            Root root = new Root() {
                taskId = taskId,
                taskName = task.Name,
                curDate = DateTime.UtcNow.ToShortDateString(),
                role = "temp",
                Resources = resources,
                Details = details
            };
            return root;
        }

        private async Task<ModelTask> GetTaskById(int taskId) {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            ModelTask result = null;
            HttpResponseMessage response = await client.GetAsync($"api/task/get_task_by_id/{taskId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<ModelTask>(json);

            }
            return result;
        }

        private async Task<IEnumerable<DetailProto>> GetDetailsDataByTaskId(int taskId)
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            IEnumerable<DetailProto> result = null;
            HttpResponseMessage response = await client.GetAsync($"api/task/get_details/{taskId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<DetailProto>>(json);

            }
            return result;
        }

        private async Task<TransportProto> GetTransportById(int transportId)
        {
            HttpClient client = MicroservicesIP.GatewayHttpClient;

            TransportProto result = null;
            HttpResponseMessage response = await client.GetAsync($"api/transport/get_by_id/{transportId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TransportProto>(json);

            }
            return result;
        }

        public class Details
        {
            public List<string> dates { get; set; }
            public List<string> status { get; set; }
            public List<Expense> Expenses { get; set; }
        }

        public class Expense
        {
            public Fuel Fuel { get; set; }
            public SomeInfo SomeInfo { get; set; }
        }

        public class Fuel
        {
            public double? num { get; set; }
            public double? price { get; set; }
        }

        public class Resources
        {
            public List<string> transport { get; set; }
            public List<string> personal { get; set; }
        }

        public class Root
        {
            public int taskId { get; set; }
            public string taskName { get; set; }
            public string curDate { get; set; }
            public string role { get; set; }
            public Resources Resources { get; set; }
            public Details Details { get; set; }
        }

        public class SomeInfo
        {
            public double? num { get; set; }
            public double? price { get; set; }
        }
    }

    

    static class TaskTypes
    {
        public static string Sowing = "Засев";
        public static string Treatment = "Обработка";
        public static string Harvesting = "Сбор";
    }
}
