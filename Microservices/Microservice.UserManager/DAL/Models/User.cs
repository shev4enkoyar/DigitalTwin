using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace Microservice.UserManager.DAL.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Role { get; set; } = "user";

        [Required]
        public string Name { get; set; }

        [Required]
        public bool IsActive { get; set; } = false;

        public DateTime CreateDate { get; set; } = DateTime.UtcNow;

        #region Relationships
        public virtual ActivateLink ActivateLink { get; set; }
        #endregion
    }
}
