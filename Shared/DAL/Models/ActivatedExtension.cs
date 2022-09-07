using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class ActivatedExtension
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Extension))]
        public int ExtensionId { get; set; }

        [ForeignKey(nameof(User))]
        public int? UserId { get; set; }

        [ForeignKey(nameof(DigitalModel))]
        public int? ModelId { get; set; }

        [Required]
        public DateTime ActivateDate { get; set; }

        [Required]
        public DateTime ExpirationDate { get; set; }

        //Relationships
        public virtual Extension Extension { get; set; }

        public virtual User User { get; set; }

        public virtual DigitalModel DigitalModel { get; set; }
    }
}
