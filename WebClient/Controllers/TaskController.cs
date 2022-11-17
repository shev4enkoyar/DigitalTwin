using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Models.SubModels;
using WebClient.Util;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : CustomControllerBase
    {
        [HttpGet("get_all/{modelId}")]
        public async Task<IEnumerable<ModelTask>> GetAllByModelId(int modelId)
        {
            IEnumerable<ModelTask> result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/task/get_all/{modelId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<ModelTask>>(json);
            }
            return result;
        }

        [HttpGet("get_details/{taskId}")]
        public async Task<TaskJson.Root> GetDetailsByTaskId(int taskId)
        {
            ModelTask task = await GetTaskById(taskId);
            List<TransportProto> transports = new List<TransportProto>();
            foreach (string item in task.TransportList.Split(";"))
            {
                var transport = await GetTransportById(int.Parse(item));
                transports.Add(transport);
            }
            IEnumerable<DetailProto> detailsDb = await GetDetailsDataByTaskId(taskId);

            TaskJson.Resources resources = new TaskJson.Resources()
            {
                personal = transports.Select(x => x.Staff).ToList(),
                transport = transports.Select(x => $"{x.Name} {x.Brand}").ToList()
            };
            TaskJson.Details details = new TaskJson.Details()
            {
                dates = detailsDb.Select(x => x.Date).ToList(),
                status = detailsDb.Select(x => x.Status).ToList(),
                Expenses = detailsDb.Select(x => new TaskJson.Expense()
                {
                    Fuel = x.Fuel.IsNullOrEmpty()
                    ? new TaskJson.Fuel() { price = null, num = null }
                    : new TaskJson.Fuel() { num = double.Parse(x.Fuel.Split(";")[0]), price = double.Parse(x.Fuel.Split(";")[1]) },
                    SomeInfo = x.SomeInfo.IsNullOrEmpty()
                    ? new TaskJson.SomeInfo() { price = null, num = null }
                    : new TaskJson.SomeInfo() { num = double.Parse(x.SomeInfo.Split(";")[0]), price = double.Parse(x.SomeInfo.Split(";")[1]) }
                }).ToList()
            };
            // TODO change role
            TaskJson.Root root = new TaskJson.Root()
            {
                taskId = taskId,
                taskName = task.Name,
                curDate = DateTime.UtcNow.ToShortDateString(),
                role = "temp",
                Resources = resources,
                Details = details
            };
            return root;
        }

        private async Task<ModelTask> GetTaskById(int taskId)
        {
            ModelTask result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/task/get_task_by_id/{taskId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<ModelTask>(json);
            }
            return result;
        }

        private async Task<IEnumerable<DetailProto>> GetDetailsDataByTaskId(int taskId)
        {
            IEnumerable<DetailProto> result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/task/get_details/{taskId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<IEnumerable<DetailProto>>(json);
            }
            return result;
        }

        private async Task<TransportProto> GetTransportById(int transportId)
        {
            TransportProto result = null;
            HttpResponseMessage response = await ConnectionClient.GetAsync($"api/transport/get_by_id/{transportId}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<TransportProto>(json);
            }
            return result;
        }
    }
}
