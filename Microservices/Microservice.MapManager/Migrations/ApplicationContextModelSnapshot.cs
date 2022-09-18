﻿// <auto-generated />
using Microservice.MapManager.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Microservice.MapManager.Migrations
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

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.Color", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("HEX")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("HEX")
                        .IsUnique();

                    b.ToTable("Color");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.Figure", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<int>("MapId")
                        .HasColumnType("integer");

                    b.Property<string>("Points")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("MapId");

                    b.ToTable("Figures");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.FigureCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ColorId")
                        .HasColumnType("integer");

                    b.Property<int>("FigureTypeId")
                        .HasColumnType("integer");

                    b.Property<int>("IconId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsUnique")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("ColorId");

                    b.HasIndex("FigureTypeId");

                    b.HasIndex("IconId");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("FigureCategories");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.FigureType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("FigureTypes");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.Icon", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Source")
                        .IsUnique();

                    b.ToTable("Icon");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.Map", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("ModelId")
                        .HasColumnType("integer");

                    b.Property<int>("ProductArea")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ModelId")
                        .IsUnique();

                    b.ToTable("Maps");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.Figure", b =>
                {
                    b.HasOne("Microservice.MapManager.DAL.Models.FigureCategory", "FigureCategory")
                        .WithMany("Figures")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microservice.MapManager.DAL.Models.Map", "Map")
                        .WithMany("Figures")
                        .HasForeignKey("MapId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FigureCategory");

                    b.Navigation("Map");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.FigureCategory", b =>
                {
                    b.HasOne("Microservice.MapManager.DAL.Models.Color", "Color")
                        .WithMany("FigureCategories")
                        .HasForeignKey("ColorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microservice.MapManager.DAL.Models.FigureType", "FigureType")
                        .WithMany("FigureCategories")
                        .HasForeignKey("FigureTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Microservice.MapManager.DAL.Models.Icon", "Icon")
                        .WithMany("FigureCategories")
                        .HasForeignKey("IconId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Color");

                    b.Navigation("FigureType");

                    b.Navigation("Icon");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.Color", b =>
                {
                    b.Navigation("FigureCategories");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.FigureCategory", b =>
                {
                    b.Navigation("Figures");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.FigureType", b =>
                {
                    b.Navigation("FigureCategories");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.Icon", b =>
                {
                    b.Navigation("FigureCategories");
                });

            modelBuilder.Entity("Microservice.MapManager.DAL.Models.Map", b =>
                {
                    b.Navigation("Figures");
                });
#pragma warning restore 612, 618
        }
    }
}
