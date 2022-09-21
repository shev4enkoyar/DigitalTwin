using Microservice.UserManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.UserManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties
        public DbSet<User> Users { get; set; }

        public DbSet<ActivateLink> ActivateLinks { get; set; }
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
