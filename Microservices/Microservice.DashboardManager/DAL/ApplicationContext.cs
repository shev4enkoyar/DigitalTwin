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

        public DbSet<ModelTransport> ModelTransports { get; set; }

        public DbSet<Transport> Transports { get; set; }
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
