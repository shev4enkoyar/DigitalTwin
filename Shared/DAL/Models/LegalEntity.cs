using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    [Index(nameof(INN), IsUnique = true)]
    [Index(nameof(UserId), IsUnique = true)]
    public class LegalEntity
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        [Required]
        public string INN { get; set; }

        [Required]
        public string SupervisorName { get; set; }

        [Required]
        public string ChargeName { get; set; }

        public string ContractNumber { get; set; }

        //Relationships
        public virtual User User { get; set; }
    }
}
