using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
