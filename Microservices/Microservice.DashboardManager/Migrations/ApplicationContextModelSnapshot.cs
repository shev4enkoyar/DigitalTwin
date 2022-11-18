﻿// <auto-generated />
using System;
using Microservice.DashboardManager.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Microservice.DashboardManager.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    partial class ApplicationContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.DigitalModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int?>("MapId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("DigitalModels");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.ModelTransport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("DigitalModelId")
                        .HasColumnType("integer");

                    b.Property<int>("TransportId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DigitalModelId");

                    b.HasIndex("TransportId");

                    b.ToTable("ModelTransports");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal?>("CurrentPrice")
                        .HasColumnType("numeric");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("SoilMoistureMax")
                        .HasColumnType("integer");

                    b.Property<int>("SoilMoistureMin")
                        .HasColumnType("integer");

                    b.Property<int>("TypeId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("Code")
                        .IsUnique();

                    b.HasIndex("Name")
                        .IsUnique();

                    b.HasIndex("TypeId");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Code = "4",
                            CurrentPrice = 0m,
                            Name = "Картофель;Спиридон",
                            SoilMoistureMax = 90,
                            SoilMoistureMin = 70,
                            TypeId = 1
                        },
                        new
                        {
                            Id = 2,
                            Code = "5",
                            CurrentPrice = 0m,
                            Name = "Кукуруза;Кубанский101МВ",
                            SoilMoistureMax = 80,
                            SoilMoistureMin = 70,
                            TypeId = 2
                        },
                        new
                        {
                            Id = 3,
                            Code = "3",
                            CurrentPrice = 0m,
                            Name = "Яровая пшеница;Эритросперум65",
                            SoilMoistureMax = 75,
                            SoilMoistureMin = 70,
                            TypeId = 2
                        },
                        new
                        {
                            Id = 4,
                            Code = "1",
                            CurrentPrice = 0m,
                            Name = "Озимая пшеница;Скипетр",
                            SoilMoistureMax = 75,
                            SoilMoistureMin = 70,
                            TypeId = 2
                        });
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.ProductPriceHistory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<decimal>("Price")
                        .HasColumnType("numeric");

                    b.Property<int>("ProductId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.ToTable("ProductPriceHistory");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.ProductType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ProductTypes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Овощ"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Зерновое"
                        });
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.Transport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StaffName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StaffNum")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Transports");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Brand = "К-700, БДТ-7",
                            Name = "Трактор + Дисковая борона",
                            StaffName = "Тракторист",
                            StaffNum = "1"
                        },
                        new
                        {
                            Id = 2,
                            Brand = "К-700, СС-6",
                            Name = "Сеялка",
                            StaffName = "Тракторист;Водитель автом.",
                            StaffNum = "1;1"
                        },
                        new
                        {
                            Id = 3,
                            Brand = "МТЗ-82, ОП-2000 ",
                            Name = "Опрыскиватель",
                            StaffName = "Тракторист;Водитель автом.",
                            StaffNum = "1;1"
                        },
                        new
                        {
                            Id = 4,
                            Brand = "МасДон",
                            Name = "Самоходная косилка",
                            StaffName = "Тракторист",
                            StaffNum = "1"
                        },
                        new
                        {
                            Id = 6,
                            Brand = "Дон-1500",
                            Name = "Зерноуборочный комбайн",
                            StaffName = "Тракторист;Водитель автом.",
                            StaffNum = "1;1"
                        },
                        new
                        {
                            Id = 7,
                            Brand = "Камаз 5320",
                            Name = "Автомобиль",
                            StaffName = "Водитель автом.",
                            StaffNum = "1"
                        },
                        new
                        {
                            Id = 8,
                            Brand = "ОВС-25",
                            Name = "Очиститель зерна",
                            StaffName = "Рабочий;Водитель автом.",
                            StaffNum = "2;1"
                        },
                        new
                        {
                            Id = 9,
                            Brand = "СС-19",
                            Name = "Сушилка",
                            StaffName = "Оператор;Рабочий",
                            StaffNum = "1;2"
                        },
                        new
                        {
                            Id = 10,
                            Brand = "МТЗ-1221, ПН-5",
                            Name = "Тактор + плуг",
                            StaffName = "Тракторист",
                            StaffNum = "1"
                        },
                        new
                        {
                            Id = 11,
                            Brand = "МТЗ1221, ПН03-310",
                            Name = "Трактор + активная борона",
                            StaffName = "Тракторист",
                            StaffNum = "1"
                        },
                        new
                        {
                            Id = 12,
                            Brand = "МТЗ-82, КРН-4.2",
                            Name = "Трактор + культиватор",
                            StaffName = "Тракторист",
                            StaffNum = "1"
                        },
                        new
                        {
                            Id = 13,
                            Brand = "МТЗ-82, Л-207",
                            Name = "Трактор + сажалка",
                            StaffName = "Тракторист;Рабочий",
                            StaffNum = "1;1"
                        },
                        new
                        {
                            Id = 14,
                            Brand = "МТЗ-82, КСТ-1.4",
                            Name = "Трактор + копатель",
                            StaffName = "Тракторист",
                            StaffNum = "1"
                        },
                        new
                        {
                            Id = 15,
                            Brand = "МТЗ-82, 2ПТС-4",
                            Name = "Трактор + прицеп",
                            StaffName = "Тракторист",
                            StaffNum = "1"
                        });
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.DigitalModel", b =>
                {
                    b.HasOne("Microservice.DashboardManager.DAL.Models.Product", "Product")
                        .WithMany("DigitalModels")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.ModelTransport", b =>
                {
                    b.HasOne("Microservice.DashboardManager.DAL.Models.DigitalModel", "DigitalModel")
                        .WithMany("ModelTransports")
                        .HasForeignKey("DigitalModelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microservice.DashboardManager.DAL.Models.Transport", "Transport")
                        .WithMany("ModelTransports")
                        .HasForeignKey("TransportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("DigitalModel");

                    b.Navigation("Transport");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.Product", b =>
                {
                    b.HasOne("Microservice.DashboardManager.DAL.Models.ProductType", "ProductType")
                        .WithMany("Products")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ProductType");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.ProductPriceHistory", b =>
                {
                    b.HasOne("Microservice.DashboardManager.DAL.Models.Product", "Product")
                        .WithMany("ProductPriceHistory")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Product");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.DigitalModel", b =>
                {
                    b.Navigation("ModelTransports");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.Product", b =>
                {
                    b.Navigation("DigitalModels");

                    b.Navigation("ProductPriceHistory");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.ProductType", b =>
                {
                    b.Navigation("Products");
                });

            modelBuilder.Entity("Microservice.DashboardManager.DAL.Models.Transport", b =>
                {
                    b.Navigation("ModelTransports");
                });
#pragma warning restore 612, 618
        }
    }
}
