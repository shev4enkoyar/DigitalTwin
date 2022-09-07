using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class AppDbContext : DbContext
    {
        #region Properties
        public DbSet<User> Users { get; set; }

        public DbSet<ActivateLink> ActivateLinks { get; set; }

        public DbSet<LegalEntity> LegalEntities { get; set; }
        public DbSet<Extension> Extensions { get; set; }

        public DbSet<ActivatedExtension> ActivatedExtensions { get; set; }

        public DbSet<DigitalModel> DigitalModels { get; set; }
        public DbSet<Product> Products { get; set; }

        public DbSet<ProductPriceHistory> ProductPriceHistory { get; set; }

        #endregion

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(u => u.CreateDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<DigitalModel>()
                .Property(dm => dm.CreateDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<ProductPriceHistory>()
                .Property(pph => pph.Date)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<ActivatedExtension>()
                .Property(ae => ae.ActivateDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            modelBuilder.Entity<ActivateLink>()
                .Property(al => al.ExpirationTime)
                .HasDefaultValueSql("CURRENT_TIMESTAMP + INTERVAL '15 minute'");

            base.OnModelCreating(modelBuilder);
        }
    }
}
