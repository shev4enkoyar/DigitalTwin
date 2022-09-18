using Microservice.MapManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.MapManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties
        public DbSet<Map> Maps { get; set; }

        public DbSet<Figure> Figures { get; set; }

        public DbSet<FigureCategory> FigureCategories { get; set; }

        public DbSet<FigureType> FigureTypes { get; set; }

        public DbSet<Color> Colors { get; set; }

        public DbSet<Color> Icons { get; set; }
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
