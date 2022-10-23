using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebClient.Models;

namespace WebClient.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<Company> Companies { get; set; }

        public DbSet<CompanyInvite> CompanyInvites { get; set; }

        public DbSet<Functional> Functionals { get; set; }

        public DbSet<Notification> Notifications { get; set; }

        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationRole>().ToTable("AspNetRoles");

            #region Add initial data

            #region Role data
            modelBuilder.Entity<ApplicationRole>().HasData(new ApplicationRole
            {
                Name = "Maintainer",
                NormalizedName = "MAINTAINER",
                FunctionalAccess = "1;2",
                TranslatedName = "Владелец компании",
                Description = ""
            },
            new ApplicationRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN",
                FunctionalAccess = "1;2;3;4;5;6;7;8;9",
                TranslatedName = "Администратор",
                Description = "Danger for using"
            });
            #endregion

            #region Functional data
            modelBuilder.Entity<Functional>().HasData(new Functional
            {
                Id = 1,
                Name = "models",
                Description = "Тех. карты компании"
            },
            new Functional
            {
                Id = 2,
                Name = "createModel",
                Description = "Создание тех. карт"
            },
            new Functional
            {
                Id = 3,
                Name = "registerCompany",
                Description = "Регистрация компании"
            },
            new Functional
            {
                Id = 4,
                Name = "activatedSubscriptions",
                Description = "Активированные подписки"
            },
            new Functional
            {
                Id = 5,
                Name = "allSubscriptions",
                Description = "Оформление подписок"
            },
            new Functional
            {
                Id = 6,
                Name = "dashboard",
                Description = "Технологическая карта"
            },
            new Functional
            {
                Id = 7,
                Name = "map",
                Description = "Карта"
            },
            new Functional
            {
                Id = 8,
                Name = "recommendation",
                Description = "Рекомендательная система"
            },
            new Functional
            {
                Id = 9,
                Name = "inviteCompany",
                Description = "Приглашение в компанию"
            });
            #endregion

            #endregion
        }
    }
}