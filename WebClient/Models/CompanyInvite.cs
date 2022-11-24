using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebClient.Models
{
    /// <summary>
    /// The model of inviting users to the company
    /// </summary>
    public class CompanyInvite
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Link to company table
        /// </summary>
        [Required]
        [ForeignKey(nameof(Company))]
        public Guid CompanyId { get; set; }

        /// <summary>
        /// Link to user table
        /// </summary>
        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; }

        /// <summary>
        /// User roles in the company
        /// </summary>
        [Required]
        public string RolesId { get; set; }

        #region Relationships

        /// <summary>
        /// Company table
        /// </summary>
        public virtual Company Company { get; set; }

        /// <summary>
        /// User table
        /// </summary>
        public virtual ApplicationUser User { get; set; }

        #endregion
    }
}
