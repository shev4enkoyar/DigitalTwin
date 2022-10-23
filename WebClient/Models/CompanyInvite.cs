using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebClient.Models
{
    public class CompanyInvite
    {
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Company))]
        public Guid CompanyId { get; set; }

        [Required]
        [ForeignKey(nameof(ApplicationUser))]
        public string UserId { get; set; }

        [Required]
        public string RolesId { get; set; }

        #region Relationships

        public virtual Company Company { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }

        #endregion
    }
}
