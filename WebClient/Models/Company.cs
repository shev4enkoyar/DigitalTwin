using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebClient.Models
{
    /// <summary>
    /// User company model
    /// </summary>
    public class Company
    {
        /// <summary>
        /// Identifier
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>
        /// User company name
        /// </summary>
        [Required]
        public string CompanyName { get; set; }

        /// <summary>
        /// Company TIN
        /// </summary>
        [Required]
        public string CompanyInn { get; set; }

        /// <summary>
        /// Name of the head of the company
        /// </summary>
        [Required]
        public string SupervisorName { get; set; }

        /// <summary>
        /// Contract number
        /// </summary>
        public string ContractId { get; set; }

        #region Relationships

        /// <summary>
        /// Company Members
        /// </summary>
        public virtual List<ApplicationUser> Employees { get; set; }

        #endregion
    }
}
