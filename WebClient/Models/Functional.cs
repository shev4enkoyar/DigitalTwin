using System.ComponentModel.DataAnnotations;

namespace WebClient.Models
{
    public class Functional
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
