using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microservice.DashboardManager.DAL.Models
{
    public class Worker
    {
        [Required]
        public int Id { get; set; }

        public string FIO { get; set; }

        [Required]
        public double Rate { get; set; }

        [Required]
        public double Salary { get; set; }

        [Required]
        [ForeignKey(nameof(DigitalModel))]
        public int DigitalModelId { get; set; }

        [ForeignKey(nameof(Post))]
        public int PostId { get; set; }

        //Relationships
        public virtual Post Post { get; set; }

        public virtual DigitalModel DigitalModel { get; set; }

    }
}
