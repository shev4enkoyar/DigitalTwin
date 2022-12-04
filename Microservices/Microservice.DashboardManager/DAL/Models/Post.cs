using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.DashboardManager.DAL.Models
{
    public class Post
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        //Relationships
        public virtual List<Worker> Workers { get; set; }
    }
}
