using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Models
{
    public class Notification
    {
        public int NotificationId { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public bool Read { get; set; } = false;
    }
}
