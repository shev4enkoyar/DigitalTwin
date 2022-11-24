using System.ComponentModel.DataAnnotations;

namespace WebClient.Models
{
    /// <summary>
    /// Class for dividing pages into functional blocks
    /// </summary>
    public class Functional
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Page name
        /// </summary>
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Description of functionality
        /// </summary>
        public string Description { get; set; }
    }
}
