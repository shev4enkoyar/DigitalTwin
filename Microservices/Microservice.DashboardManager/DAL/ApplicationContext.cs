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
                Id = 1,
                Name = "Картофель;Спиридон",
                Code = "4",
                CurrentPrice = 0,
                SoilMoistureMax = 90,
                SoilMoistureMin = 70,
                TypeId = 1,
            }, new Product
            {
                Id = 2,
                Name = "Кукуруза;Кубанский101МВ",
                Code = "5",
                CurrentPrice = 0,
                SoilMoistureMax = 80,
                SoilMoistureMin = 70,
                TypeId = 2
            }, new Product
            {
                Id = 3,
                Name = "Яровая пшеница;Эритросперум65",
                Code = "3",
                CurrentPrice = 0,
                SoilMoistureMax = 75,
                SoilMoistureMin = 70,
                TypeId = 2
            }, new Product
            {
                Id = 4,
                Name = "Озимая пшеница;Скипетр",
                Code = "1",
                CurrentPrice = 0,
                SoilMoistureMax = 75,
                SoilMoistureMin = 70,
                TypeId = 2
            });
            #endregion

            modelBuilder.Entity<Transport>().HasData(new Transport() 
            {
                 Id = 1,
                 Name = "Трактор + Дисковая борона",
                 Brand = "К-700, БДТ-7",
                 Staff = "Тракторист - 1"
            },
            new Transport()
            {
                Id = 2,
                Name = "Сеялка",
                Brand = "К-700, СС-6",
                Staff = "Тракторист - 1;Водитель автом. - 1"
            },
            new Transport()
            {
                Id = 3,
                Name = "Опрыскиватель",
                Brand = "МТЗ-82, ОП-2000 ",
                Staff = "Тракторист -1, Водитель автом. - 1"
            },
            new Transport()
            {
                Id = 1,
                Name = "Самоходная косилка",
                Brand = "МасДон",
                Staff = "Тракторист -1"
            },
            new Transport()
            {
                Id = 1,
                Name = "Зерноуборочный комбайн",
                Brand = "Дон-1500",
                Staff = "Тракторист -1, Водитель автом. - 1"
            },
            new Transport()
            {
                Id = 1,
                Name = "Автомобиль",
                Brand = "Камаз 5320",
                Staff = ""
            },
            new Transport()
            {
                Id = 1,
                Name = "Очиститель зерна",
                Brand = "ОВС-25",
                Staff = ""
            },
            new Transport()
            {
                Id = 1,
                Name = "Сушилка",
                Brand = "СС-19",
                Staff = ""
            },
            new Transport()
            {
                Id = 1,
                Name = "Тактор + плуг",
                Brand = "МТЗ-1221, ПН-5",
                Staff = ""
            },
            new Transport()
            {
                Id = 1,
                Name = "Трактор + активная борона",
                Brand = "МТЗ1221, ПН03-310",
                Staff = ""
            },
            new Transport()
            {
                Id = 1,
                Name = "Трактор + культиватор",
                Brand = "МТЗ-82, КРН-4.2",
                Staff = ""
            },
            new Transport()
            {
                Id = 1,
                Name = "Трактор + сажалка",
                Brand = "МТЗ-82, Л-207",
                Staff = ""
            },
            new Transport()
            {
                Id = 1,
                Name = "Трактор + копатель",
                Brand = "МТЗ-82, КСТ-1.4",
                Staff = ""
            },
            new Transport()
            {
                Id = 1,
                Name = "Трактор + прицеп",
                Brand = "МТЗ-82, 2ПТС-4",
                Staff = ""
            });
        }
    }
}
