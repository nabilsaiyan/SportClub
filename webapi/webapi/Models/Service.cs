using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Models
{
    public class Service
    {
        public int ServiceId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Day> Days { get; set; }
        [System.Text.Json.Serialization.JsonIgnore]
        public ICollection<Subscription> Subscriptions { get; set; }

    }
}
