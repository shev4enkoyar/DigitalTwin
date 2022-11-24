using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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
    /// <summary>
    /// Controller for interaction with technological map tasks
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : CustomControllerBase
    {
        /// <summary>
        /// Role management property
        /// </summary>
        private readonly RoleManager<ApplicationRole> _roleManager;

        /// <summary>
        /// User management property
        /// </summary>
        private readonly UserManager<ApplicationUser> _userManager;

        /// <summary>
        /// Database access property
        /// </summary>
        private readonly ApplicationDbContext _dbContext;

        /// <summary>
        /// Enumeration of roles with access control
        /// </summary>
        private IEnumerable<string> RoleNamesWithAccess { get; } = new List<string> { "AGRONOMIST", "ECONOMIST" };

        /// <summary>
        /// Dependency injection constructor
        /// </summary>
        public TaskController(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _dbContext = dbContext;
        }

        /// <summary>
        /// Method for getting all tasks on the technological map
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <returns>Enumeration of the technological map task</returns>
        [HttpGet("get_all/{modelId:int}")]
        public async Task<IEnumerable<ModelTask>> GetAllByModelId(int modelId)
        {
            var response = await ConnectionClient.GetAsync($"api/task/get_all/{modelId}");

            if (!response.IsSuccessStatusCode)
                return null;

            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<ModelTask>>(json);
            return result;
        }

        /// <summary>
        /// Task information update method
        /// </summary>
        /// <param name="modelId">Model Id</param>
        /// <param name="taskId">Task Id</param>
        /// <param name="date">Date task</param>
        /// <param name="status">Day status</param>
        /// <param name="fuel">Fuel on day</param>
        /// <param name="seeds">Seeds on day</param>
        /// <param name="fertilizers">Fertilizers on day</param>
        /// <param name="pesticides">Pesticides on day</param>
        /// <returns>Status 200 if successful, otherwise 400</returns>
        [HttpGet("update_detail/{modelId:int}")]
        public async Task<ActionResult> UpdateDetailByModelId(int modelId, int taskId, string date, string status = "", string fuel = "", string seeds = "", string fertilizers = "", string pesticides = "")
        {
            string result = null;
            var roleName = GetUserRoleName().Result;
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
            if (result != null && result.Equals("ok"))
                return Ok();
            return BadRequest();
        }

        /// <summary>
        /// Method for obtaining detailed information on a task
        /// </summary>
        /// <param name="taskId">Task Id</param>
        /// <returns>Detailed Information Object</returns>
        [HttpGet("get_details/{taskId:int}")]
        public async Task<TaskJson.Root> GetDetailsByTaskId(int taskId)
        {
            var task = await GetTaskById(taskId);
            var transports = new List<TransportProto>();
            foreach (var item in task.TransportList.Split(";"))
            {
                var transport = await GetTransportById(int.Parse(item));
                transports.Add(transport);
            }
            IEnumerable<DetailProto> detailProtos = GetDetailsDataByTaskId(taskId).Result.ToList();

            var resources = new TaskJson.Resources
            {
                Personal = transports.Select(x => x.Staff).ToList(),
                Transport = transports.Select(x => $"{x.Name} {x.Brand}").ToList()
            };

            var details = new TaskJson.Details
            {
                Dates = detailProtos.Select(x => x.Date).ToList(),
                Status = detailProtos.Select(x => x.Status).ToList(),
                Expenses = detailProtos.Select(x => new TaskJson.Expense
                {
                    Fuels = x.Fuel.IsNullOrEmpty()
                    ? new List<TaskJson.Fuel> { new TaskJson.Fuel { Num = null, Price = null } }
                    : x.Fuel.Split("/")
                      .Select(y => new TaskJson.Fuel { Num = double.Parse(y.Split(";")[0]), Price = double.Parse(y.Split(";")[1]) })
                      .ToList(),
                    Seeds = x.Seeds.IsNullOrEmpty()
                    ? new TaskJson.Seeds { Price = null, Num = null }
                    : new TaskJson.Seeds { Num = double.Parse(x.Seeds.Split(";")[0]), Price = double.Parse(x.Seeds.Split(";")[1]) },
                    Fertilizers = x.Fertilizers.IsNullOrEmpty()
                    ? new TaskJson.Fertilizers { Price = null, Num = null }
                    : new TaskJson.Fertilizers { Num = double.Parse(x.Fertilizers.Split(";")[0]), Price = double.Parse(x.Fertilizers.Split(";")[1]) },
                    Pesticides = x.Pesticides.IsNullOrEmpty()
                    ? new TaskJson.Pesticides { Price = null, Num = null }
                    : new TaskJson.Pesticides { Num = double.Parse(x.Pesticides.Split(";")[0]), Price = double.Parse(x.Pesticides.Split(";")[1]) },
                }).ToList()
            };

            var roleName = GetUserRoleName().Result;
            if (roleName == null)
                return null;

            var root = new TaskJson.Root
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

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        private async Task<string> GetUserRoleName()
        {
            return (await GetUserRoles())
                .Where(role => RoleNamesWithAccess
                    .Any(x => x.Equals(role.NormalizedName)))
                .Select(role => role.NormalizedName)
                .FirstOrDefault();
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
            var response = await ConnectionClient.GetAsync($"api/task/get_task_by_id/{taskId}");
            if (!response.IsSuccessStatusCode) return null;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<ModelTask>(json);
            return result;
        }

        private async Task<IEnumerable<DetailProto>> GetDetailsDataByTaskId(int taskId)
        {
            var response = await ConnectionClient.GetAsync($"api/task/get_details/{taskId}");
            if (!response.IsSuccessStatusCode) return null;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<IEnumerable<DetailProto>>(json);
            return result;
        }

        private async Task<TransportProto> GetTransportById(int transportId)
        {
            var response = await ConnectionClient.GetAsync($"api/transport/get_by_id/{transportId}");
            if (!response.IsSuccessStatusCode) return null;
            var json = await response.Content.ReadAsStringAsync();
            var result = JsonConvert.DeserializeObject<TransportProto>(json);
            return result;
        }
    }
}
