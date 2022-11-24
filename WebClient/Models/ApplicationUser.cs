using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebClient.Models
{
    /// <summary>
    /// Inherited Model from Entity Framework Users Model
    /// </summary>
    public class ApplicationUser : IdentityUser
    {
        /// <summary>
        /// Link to the user's company. May be null
        /// </summary>
        [ForeignKey(nameof(Company))]
        public Guid? CompanyId { get; set; }

        #region Relationships

        /// <summary>
        /// Company table
        /// </summary>
        public virtual Company Company { get; set; }

        #endregion
    }
}
