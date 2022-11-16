using Microservice.FileManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.FileManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties

        public DbSet<Paper> Papers { get; set; }
        public DbSet<Section> Sections { get; set; }

        #endregion

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Section>().HasData(new Section
            {
                Id = 1,
                Name = "Агрономия"
            },
            new Section
            {
                Id = 2,
                Name = "Экономика"
            });
        }
    }
}
