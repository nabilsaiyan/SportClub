using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Models
{
    public class Subscription
    {
        public int SubscriptionId { get; set; }
        public string Title { get; set; }
        public float Price { get; set; }
        public string[] Description { get; set; }
        public ICollection<Service> Services { get; set; }
    }
}
