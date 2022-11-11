using Microservice.WeatherManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.WeatherManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties

        public DbSet<Weather> Weathers { get; set; }

        #endregion

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            /*Database.EnsureCreated();*/
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
