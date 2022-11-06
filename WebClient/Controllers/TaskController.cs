using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using WebClient.Data;
using WebClient.Models;

namespace WebClient.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _dbContext;

        public TaskController(UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpGet("get_all/{modelId}")]
        public string GetAllByModelId(int modelId)
        {
            #region Test data
            var testTask1 = new ModelTask()
            {
                StartDate = new DateTime(2022, 9, 5),
                EndDate = new DateTime(2022, 9, 29),
                TaskType = TaskTypes.Sowing,
                Progress = 100,
                IsComplete = false
            };
            var testTask2 = new ModelTask()
            {
                StartDate = new DateTime(2022, 9, 28),
                EndDate = new DateTime(2022, 10, 31),
                TaskType = TaskTypes.Treatment,
                Progress = 100,
                IsComplete = false
            };
            var testTask3 = new ModelTask()
            {
                StartDate = new DateTime(2022, 11, 1),
                EndDate = new DateTime(2022, 11, 25),
                TaskType = TaskTypes.Harvesting,
                Progress = 30,
                IsComplete = false
            };
            #endregion

            IEnumerable<ModelTask> modelTasks = new List<ModelTask>() { testTask1, testTask2, testTask3 };

            var json = JsonConvert.SerializeObject(modelTasks);
            return json;
        }
    }

    public class ModelTask
    {
        public DateTime StartDate;
        public DateTime EndDate;
        public string TaskType;
        public bool IsComplete;
        public int Progress;
    }

    static class TaskTypes
    {
        public static string Sowing = "Засев";
        public static string Treatment = "Обработка";
        public static string Harvesting = "Сбор";
    }
}
