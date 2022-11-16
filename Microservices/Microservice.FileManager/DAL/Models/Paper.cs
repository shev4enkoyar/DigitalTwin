using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microservice.FileManager.DAL.Models
{
    public class Paper
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public int ModelId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Extension { get; set; }

        [Required]
        [ForeignKey(nameof(Section))]
        public int SectionId { get; set; }

        [Required]
        public string Link { get; set; }

        [Required]
        public DateTime CreateDate { get; set; }


        public virtual Section Section { get; set; }
    }
}
