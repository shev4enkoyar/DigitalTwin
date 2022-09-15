﻿using Microsoft.EntityFrameworkCore;

namespace Microservice.UserManager.DAL
{
    public class ApplicationContext : DbContext
    {
        #region Properties

        #endregion

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
