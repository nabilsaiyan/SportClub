using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace webapi.Models
{
    public class Account
    {
        public int AccountId { get; set; }
        public string Login { get; set; }
        [Required]
        [StringLength(20, MinimumLength = 4, ErrorMessage = "Le mot de passe est faible")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public int RoleId { get; set; }
        public Role Role { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }
}
