using Microservice.DashboardManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.DashboardManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties
        public DbSet<ProductPriceHistory> ProductPriceHistory { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Worker> Workers{ get; set; }

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

            #region Post
            modelBuilder.Entity<Post>().HasData(new Post() 
            {
                 Id=1,
                 Title = "Тракторист"
            },
            new Post()
            {
                Id = 2,
                Title = "Водитель автом."
            },
            new Post()
            {
                Id = 3,
                Title = "Рабочий"
            },
            new Post()
            {
                Id = 4,
                Title = "Оператор"
            });
            #endregion

            #region Transport
            modelBuilder.Entity<Transport>().HasData(new Transport() 
            {
                 Id = 1,
                 Name = "Трактор + Дисковая борона",
                 Brand = "К-700, БДТ-7",
                 StaffName = "Тракторист",
                 StaffNum = "1"
            },
            new Transport()
            {
                Id = 2,
                Name = "Сеялка",
                Brand = "К-700, СС-6",
                StaffName = "Тракторист;Водитель автом.",
                StaffNum = "1;1"
            },
            new Transport()
            {
                Id = 3,
                Name = "Опрыскиватель",
                Brand = "МТЗ-82, ОП-2000 ",
                StaffName = "Тракторист;Водитель автом.",
                StaffNum = "1;1"
            },
            new Transport()
            {
                Id = 4,
                Name = "Самоходная косилка",
                Brand = "МасДон",
                StaffName = "Тракторист",
                StaffNum = "1"
            },
            new Transport()
            {
                Id = 6,
                Name = "Зерноуборочный комбайн",
                Brand = "Дон-1500",
                StaffName = "Тракторист;Водитель автом.",
                StaffNum = "1;1"
            },
            new Transport()
            {
                Id = 7,
                Name = "Автомобиль",
                Brand = "Камаз 5320",
                StaffName = "Водитель автом.",
                StaffNum = "1"
            },
            new Transport()
            {
                Id = 8,
                Name = "Очиститель зерна",
                Brand = "ОВС-25",
                StaffName = "Рабочий;Водитель автом.",
                StaffNum = "2;1"
            },
            new Transport()
            {
                Id = 9,
                Name = "Сушилка",
                Brand = "СС-19",
                StaffName = "Оператор;Рабочий",
                StaffNum = "1;2"
            },
            new Transport()
            {
                Id = 10,
                Name = "Тактор + плуг",
                Brand = "МТЗ-1221, ПН-5",
                StaffName = "Тракторист",
                StaffNum = "1"
            },
            new Transport()
            {
                Id = 11,
                Name = "Трактор + активная борона",
                Brand = "МТЗ1221, ПН03-310",
                StaffName = "Тракторист",
                StaffNum = "1"
            },
            new Transport()
            {
                Id = 12,
                Name = "Трактор + культиватор",
                Brand = "МТЗ-82, КРН-4.2",
                StaffName = "Тракторист",
                StaffNum = "1"
            },
            new Transport()
            {
                Id = 13,
                Name = "Трактор + сажалка",
                Brand = "МТЗ-82, Л-207",
                StaffName = "Тракторист;Рабочий",
                StaffNum = "1;1"
            },
            new Transport()
            {
                Id = 14,
                Name = "Трактор + копатель",
                Brand = "МТЗ-82, КСТ-1.4",
                StaffName = "Тракторист",
                StaffNum = "1"
            },
            new Transport()
            {
                Id = 15,
                Name = "Трактор + прицеп",
                Brand = "МТЗ-82, 2ПТС-4",
                StaffName = "Тракторист",
                StaffNum = "1"
            });
            #endregion
        }
    }
}
