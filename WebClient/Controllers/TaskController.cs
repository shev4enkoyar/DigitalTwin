using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Shared;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using WebClient.Controllers.Base;
using WebClient.Data;
using WebClient.Models;
using WebClient.Models.SubModels;
using WebClient.Util;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : CustomControllerBase
    {
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _dbContext;
        private List<string> RoleNamesWithAccess { get; } = new List<string> { "AGRONOMIST", "ECONOMIST" };

        public TaskController(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _dbContext = dbContext;
        }

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
        [HttpGet("update_detail/{modelId}")]
        public async Task<ActionResult> UpdateDetailByModelId(int modelId, int taskId, string date, string status = "", string fuel = "", string seeds = "", string fertilizers = "", string pesticides = "")
        {
            string result = null;
            string roleName = GetUserRoleName().Result;
            if (roleName == null)
                return BadRequest("No permission");
            
            HttpResponseMessage response;
            switch (roleName)
            {
                case "AGRONOMIST":
                    response = await ConnectionClient.GetAsync
                        ($"api/task/update_detail/{modelId}?taskId={taskId}&date={date}&status={status}");
                    break;
                case "ECONOMIST":
                    response = await ConnectionClient.GetAsync
                        ($"api/task/update_detail/{modelId}?taskId={taskId}&date={date}&fuel={fuel}&seeds={seeds}&fertilizers={fertilizers}&Pesticides={pesticides}");
                    break;
                default:
                    return BadRequest("No permission");
            }
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonConvert.DeserializeObject<string>(json);
            }
            if (result.Equals("ok"))
                return Ok();
            return BadRequest();
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
                Personal = transports.Select(x => x.Staff).ToList(),
                Transport = transports.Select(x => $"{x.Name} {x.Brand}").ToList()
            };
            TaskJson.Details details = new TaskJson.Details()
            {
                Dates = detailsDb.Select(x => x.Date).ToList(),
                Status = detailsDb.Select(x => x.Status).ToList(),
                Expenses = detailsDb.Select(x => new TaskJson.Expense()
                {
                    Fuel = x.Fuel.IsNullOrEmpty()
                    ? new List<TaskJson.Fuel>() { new TaskJson.Fuel() { Num = null, Price = null } }
                    : x.Fuel.Split("/")
                      .Select(y => new TaskJson.Fuel() { Num = double.Parse(y.Split(";")[0]), Price = double.Parse(y.Split(";")[1]) })
                      .ToList(),
                    Seeds = x.Seeds.IsNullOrEmpty()
                    ? new TaskJson.Seeds() { Price = null, Num = null }
                    : new TaskJson.Seeds() { Num = double.Parse(x.Seeds.Split(";")[0]), Price = double.Parse(x.Seeds.Split(";")[1]) },
                    Fertilizers = x.Fertilizers.IsNullOrEmpty()
                    ? new TaskJson.Fertilizers() { Price = null, Num = null }
                    : new TaskJson.Fertilizers() { Num = double.Parse(x.Fertilizers.Split(";")[0]), Price = double.Parse(x.Fertilizers.Split(";")[1]) },
                    Pesticides = x.Pesticides.IsNullOrEmpty()
                    ? new TaskJson.Pesticides() { Price = null, Num = null }
                    : new TaskJson.Pesticides() { Num = double.Parse(x.Pesticides.Split(";")[0]), Price = double.Parse(x.Pesticides.Split(";")[1]) },
                }).ToList()
            };

            string roleName = GetUserRoleName().Result;
            if (roleName == null)
                return null;

            TaskJson.Root root = new TaskJson.Root()
            {
                TaskId = taskId,
                TaskName = task.Name,
                CurDate = DateTime.UtcNow.ToString("MM/dd/yyyy", CultureInfo.InvariantCulture),
                Role = roleName,
                Resources = resources,
                Details = details
            };
            return root;
        }

        private async Task<string> GetUserRoleName()
        {
            foreach (var role in await GetUserRoles())
            {
                if (RoleNamesWithAccess.Any(x => x.Equals(role.NormalizedName)))
                    return role.NormalizedName;
            }
            return null;
        }

        private async Task<IEnumerable<ApplicationRole>> GetUserRoles()
        {
            var user = await _userManager.FindByIdAsync(User.FindFirstValue(ClaimTypes.NameIdentifier));
            if (user == null)
                return null;
            var userRoles = _dbContext.UserRoles.Where(x => x.UserId == user.Id).ToList();
            return userRoles.Select(x => _roleManager.FindByIdAsync(x.RoleId).Result).ToList();
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
