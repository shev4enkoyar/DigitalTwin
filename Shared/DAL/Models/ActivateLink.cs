using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    [Index(nameof(UserId), IsUnique = true)]
    public class ActivateLink
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [Required]
        public string Link { get; set; }

        [Required]
        public DateTime ExpirationTime { get; set; }

        //Relationships
        public virtual User User { get; set; }
    }
}
