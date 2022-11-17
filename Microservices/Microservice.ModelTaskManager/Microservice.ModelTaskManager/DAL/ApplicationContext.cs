using Microservice.ModelTaskManager.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace Microservice.ModelTaskManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Detail> Details { get; set; }
        #endregion

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            /*#region Tasks
            modelBuilder.Entity<Task>().HasData(new Task
            {
                Id = 1,
                Name = "Высев семян",
                Type = "Высев",
                ModelId = 24,
                StartDate = DateTime.UtcNow.AddDays(-3),
                EndDate = DateTime.UtcNow.AddDays(3),
                TransportList = "2;5;6"
            });
            #endregion

            #region Details
            modelBuilder.Entity<Detail>().HasData(new Detail
            {
                Id = 1,
                Date = DateTime.UtcNow.AddDays(-3),
                Status = "done",
                TaskId = 1,
                Fuel = "123.9;234.9",
                SomeInfo = "123.9;234.9"
            },
            new Detail
            {
                Id = 1,
                Date = DateTime.UtcNow.AddDays(-2),
                Status = "undone",
                TaskId = 1,
                Fuel = "0;0",
                SomeInfo = "0;0"
            },
            new Detail
            {
                Id = 1,
                Date = DateTime.UtcNow.AddDays(-1),
                Status = "late",
                TaskId = 1,
                Fuel = "123.9;234.9",
                SomeInfo = "123.9;234.9"
            },
            new Detail
            {
                Id = 1,
                Date = DateTime.UtcNow,
                Status = "active",
                TaskId = 1,
                Fuel = "123.9;234.9",
                SomeInfo = "123.9;234.9"
            },
            new Detail
            {
                Id = 1,
                Date = DateTime.UtcNow.AddDays(1),
                Status = "passive",
                TaskId = 1,
                Fuel = "123.9;234.9",
                SomeInfo = "123.9;234.9"
            },
            new Detail
            {
                Id = 1,
                Date = DateTime.UtcNow.AddDays(2),
                Status = "passive",
                TaskId = 1,
                Fuel = "123.9;234.9",
                SomeInfo = "123.9;234.9"
            },
            new Detail
            {
                Id = 1,
                Date = DateTime.UtcNow.AddDays(3),
                Status = "passive",
                TaskId = 1,
                Fuel = "123.9;234.9",
                SomeInfo = "123.9;234.9"
            });
            #endregion*/
        }
    }
}
