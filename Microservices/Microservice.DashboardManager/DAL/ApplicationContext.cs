using Microservice.DashboardManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.DashboardManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties
        public DbSet<ProductPriceHistory> ProductPriceHistory { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }

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

            #region ProductType
            modelBuilder.Entity<ProductType>().HasData(new ProductType
            {
                Id = 1,
                Name = "Овощ"
            },
            new ProductType
            {
                Id = 2,
                Name = "Зерновое"
            });
            #endregion

            #region Product
            modelBuilder.Entity<Product>().HasData(new Product
            {
                Name = "Картофель;Спиридон",
                Code = "4",
                CurrentPrice = 0,
                SoilMoistureMax = 90,
                SoilMoistureMin = 70,
                TypeId = 1,
            }, new Product
            {
                Name = "Кукуруза;Кубанский101МВ",
                Code = "5",
                CurrentPrice = 0,
                SoilMoistureMax = 80,
                SoilMoistureMin = 70,
                TypeId = 2
            }, new Product
            {
                Name = "Яровая пшеница;Эритросперум65",
                Code = "3",
                CurrentPrice = 0,
                SoilMoistureMax = 75,
                SoilMoistureMin = 70,
                TypeId = 2
            }, new Product
            {
                Name = "Озимая пшеница;Скипетр",
                Code = "1",
                CurrentPrice = 0,
                SoilMoistureMax = 75,
                SoilMoistureMin = 70,
                TypeId = 2
            });
            #endregion
        }
    }
}
