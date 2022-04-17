using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webapi.Models
{
    public class Instructor
    {
        public int InstructorId { get; set; }
        public Speciality Speciality { get; set; }
        public int AccountId { get; set; }
        public Account Account { get; set; }

    }
}
