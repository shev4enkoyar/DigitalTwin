using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebClient.Models
{
    public class Company
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string CompanyINN { get; set; }

        [Required]
        public string SupervisorName { get; set; }

        public string ContractId { get; set; }

        #region Relationships

        public virtual List<ApplicationUser> Employees { get; set; }

        #endregion
    }
}
