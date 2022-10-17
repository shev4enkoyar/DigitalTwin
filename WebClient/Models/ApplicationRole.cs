using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace WebClient.Models
{
    public class ApplicationRole : IdentityRole
    {
        [Required]
        public string FunctionalAccess { get; set; }
    }
}
