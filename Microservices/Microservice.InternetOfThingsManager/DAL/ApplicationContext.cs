using Microservice.InternetOfThingsManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.InternetOfThingsManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties

        public DbSet<Sensor> Sensors { get; set; }

        public DbSet<SensorFunctional> SensorFunctionals { get; set; }
        public DbSet<SensorData> SensorDatas { get; set; }

        #endregion

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            #region SensorFunctional
            modelBuilder.Entity<SensorFunctional>().HasData(new SensorFunctional 
            {
                Id = 1,
                Name = "Temperature",
                Description = "Температура воздуха"
            },
            new SensorFunctional
            {
                Id = 2,
                Name = "Air humidity",
                Description = "Влажность воздуха"
            },
            new SensorFunctional
            {
                Id = 3,
                Name = "Atmospheric pressure",
                Description = "Атмосферное давление"
            },
            new SensorFunctional
            {
                Id = 4,
                Name = "Soil temperature",
                Description = "Температура почвы"
            },
            new SensorFunctional
            {
                Id = 5,
                Name = "Soil moisture",
                Description = "Влажность почвы"
            });
            #endregion
        }
    }
}
