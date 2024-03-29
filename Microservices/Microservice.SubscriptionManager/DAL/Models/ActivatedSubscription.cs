﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Microservice.SubscriptionManager.DAL.Models
{
    public class ActivatedSubscription
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public DateTime ActivatedData{ get; set; }

        [Required]
        public DateTime ExpirationData { get; set; }

        [Required]
        [ForeignKey(nameof(Subscription))]
        public int SubscriptionId { get; set; }

        [Required]
        public int ModelId { get; set; }

        //Relationships

        public virtual Subscription Subscription { get; set; }
    }
}
