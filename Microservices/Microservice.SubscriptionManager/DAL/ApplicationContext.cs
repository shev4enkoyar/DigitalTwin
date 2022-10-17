using Microservice.SubscriptionManager.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace Microservice.SubscriptionManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties

        public DbSet<Subscription> Subscriptions{ get; set; }

        public DbSet<ActivatedSubscription> ActivatedSubscriptions{ get; set; }

        #endregion

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            /*Database.EnsureCreated();*/
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
