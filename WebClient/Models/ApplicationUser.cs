using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebClient.Models
{
    public class ApplicationUser : IdentityUser
    {
        [ForeignKey(nameof(Company))]
        public Guid? CompanyId { get; set; }

        #region Relationships

        public virtual Company Company { get; set; }

        #endregion
    }
}
