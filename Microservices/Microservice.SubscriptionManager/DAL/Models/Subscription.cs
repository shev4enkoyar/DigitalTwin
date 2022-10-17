using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Microservice.SubscriptionManager.DAL.Models
{
    [Index(nameof(Name), IsUnique = true)]
    public class Subscription
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Price{ get; set; }

        [Required]
        public string FunctionalAccess { get; set; }

        //Relationships

        public virtual List<ActivatedSubscription> ActivatedSubscriptions { get; set; }
    }
}
