﻿using System;
using System.Collections;
using System.Collections.Generic;
using WebClient.Models;

namespace WebClient.Util
{
    public class FullSubscriptionModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public IEnumerable<string> Functions { get; set; }
   
    }
}
