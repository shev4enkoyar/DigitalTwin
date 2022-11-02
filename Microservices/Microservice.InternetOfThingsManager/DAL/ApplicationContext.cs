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
        }
    }
}
