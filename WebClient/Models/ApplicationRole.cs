using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace WebClient.Models
{
    /// <summary>
    /// Role Model Inherited from Entity Framework Role Model
    /// </summary>
    public class ApplicationRole : IdentityRole
    {
        /// <summary>
        /// Available functionality for the role
        /// </summary>
        [Required]
        public string FunctionalAccess { get; set; }

        /// <summary>
        /// Translated role name
        /// </summary>
        [Required]
        public string TranslatedName { get; set; }

        /// <summary>
        /// Role Description
        /// </summary>
        [Required]
        public string Description { get; set; }
    }
}
