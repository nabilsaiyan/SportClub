namespace webapi.Models
{
    public class Day
    {
        public int DayId { get; set; }
        public DayOfTheWeek Name { get; set; }
        public bool Mording { get; set; }
        public bool Evening { get; set; }

    }

    public enum DayOfTheWeek
    {
        Monday,
        Tuesday,
        Wednesday,
        Thursday,
        Friday,
        Saturday,
        Sunday
    }
}
