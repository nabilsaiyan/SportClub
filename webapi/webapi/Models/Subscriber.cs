using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Models
{
    public enum MethodPayment
    {
        Cash,
        Credit
    }
    public class Subscriber
    {
        public int SubscriberId { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }
        public int SubscriptionId { get; set; }
        public Subscription Subscription { get; set; }
        public MethodPayment Payment { get; set; }
        public DateTime ExpirationDate { get; set; }
    }

    
}
