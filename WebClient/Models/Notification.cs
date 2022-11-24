using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebClient.Models
{
    /// <summary>
    /// User notification model
    /// </summary>
    public class Notification
    {
        /// <summary>
        /// Identifier
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// User message
        /// </summary>
        [Required]
        public string Message { get; set; }

        /// <summary>
        /// Url to redirect to the page
        /// </summary>
        [Required]
        public string RedirectLink { get; set; }

        /// <summary>
        /// Notification type
        /// </summary>
        [Required]
        public string Type { get; set; }

        /// <summary>
        /// Link index to user table
        /// </summary>
        [Required]
        [ForeignKey(nameof(ApplicationUser))]
        public string UserId { get; set; }

        #region Relationships

        /// <summary>
        /// Link to user table
        /// </summary>
        public virtual ApplicationUser User { get; set; }

        #endregion
    }
}
