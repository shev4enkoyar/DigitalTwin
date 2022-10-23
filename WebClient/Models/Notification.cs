using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebClient.Models
{
    public class Notification
    {
        public int Id { get; set; }

        [Required]
        public string Message{ get; set; }

        [Required]
        public string RedirectLink { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        [ForeignKey(nameof(ApplicationUser))]
        public Guid UserId{ get; set; }

        #region Relationships

        public virtual ApplicationUser User { get; set; }

        #endregion
    }
}
