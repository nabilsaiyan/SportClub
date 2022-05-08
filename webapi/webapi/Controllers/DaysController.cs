using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.DataLayer;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DaysController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Days
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Day>>> GetDays()
        {
            return await _context.Days.ToListAsync();
        }

        // GET: api/Days/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Day>> GetDay(int id)
        {
            var day = await _context.Days.FindAsync(id);

            if (day == null)
            {
                return NotFound();
            }

            return day;
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<Day>> GetDay(string name)
        {
            var day = await _context.Days.FirstOrDefaultAsync(s => s.Name == DayOfTheWeek.Friday); ;
            if (name == "Monday")
                day = await _context.Days.FirstOrDefaultAsync(s => s.Name == DayOfTheWeek.Monday);
            else if (name == "Tuesday")
                day = await _context.Days.FirstOrDefaultAsync(s => s.Name == DayOfTheWeek.Tuesday);
            else if (name == "Wednesday")
                day = await _context.Days.FirstOrDefaultAsync(s => s.Name == DayOfTheWeek.Wednesday);
            else if (name == "Thursday")
                day = await _context.Days.FirstOrDefaultAsync(s => s.Name == DayOfTheWeek.Thursday);
            else if (name == "Friday")
                day = await _context.Days.FirstOrDefaultAsync(s => s.Name == DayOfTheWeek.Friday);
            else if (name == "Saturday")
                day = await _context.Days.FirstOrDefaultAsync(s => s.Name == DayOfTheWeek.Saturday);
            else if (name == "Sunday")
                day = await _context.Days.FirstOrDefaultAsync(s => s.Name == DayOfTheWeek.Sunday);


            if (day == null)
            {
                return NotFound();
            }

            return day;
        }

        // PUT: api/Days/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDay(int id, Day day)
        {
            if (id != day.DayId)
            {
                return BadRequest();
            }

            _context.Entry(day).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DayExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Days
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Day>> PostDay(Day day)
        {
            _context.Days.Add(day);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDay", new { id = day.DayId }, day);
        }

        // DELETE: api/Days/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDay(int id)
        {
            var day = await _context.Days.FindAsync(id);
            if (day == null)
            {
                return NotFound();
            }

            _context.Days.Remove(day);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DayExists(int id)
        {
            return _context.Days.Any(e => e.DayId == id);
        }
    }
}
