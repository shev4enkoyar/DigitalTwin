using Microservice.DashboardManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.DashboardManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties
        public DbSet<ProductPriceHistory> ProductPriceHistory { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<DigitalModel> DigitalModels { get; set; }
        #endregion

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
