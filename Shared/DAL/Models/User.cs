using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DAL.Models
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
        public string Name { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsIndividual { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }

        //Relationships
        public virtual ActivateLink ActivateLink { get; set; }

        public virtual LegalEntity LegalEntity { get; set; }

        public virtual List<ActivatedExtension> ActivatedExtensions { get; set; }

        public virtual List<DigitalModel> DigitalModels { get; set; }
    }
}
