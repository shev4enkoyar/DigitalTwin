using Microsoft.EntityFrameworkCore;

namespace Microservice.ModelTaskManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties
        
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
