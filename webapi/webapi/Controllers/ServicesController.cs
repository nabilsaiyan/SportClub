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
    public class ServicesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServicesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Services
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetServices()
        {
            return await _context.Services.Include("Days").ToListAsync();
        }

        // GET: api/Services/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Service>> GetService(int id)
        {
            var service = await _context.Services.Include("Days").FirstOrDefaultAsync(s => s.ServiceId == id);

            if (service == null)
            {
                return NotFound();
            }

            return service;
        }
        //houssamm
        [HttpPost("TimeTable/{id}")]
        public async Task<ActionResult<Service>> PostDays(int id, List<Day> days)
        {
            try
            {
                Service service = await _context.Services.Include("Days").FirstOrDefaultAsync(item => item.ServiceId == id);
                if (service == null)
                {
                    return BadRequest();
                }
                foreach (Day day in service.Days)
                {
                    _context.Days.Remove(day);
                }
                service.Days = days;
                await _context.SaveChangesAsync();
                return service;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                  "Error adding new days");
            }
        }
        [HttpGet("{name}")]
        public async Task<ActionResult<Service>> GetService(string name)
        {
            var service = await _context.Services.Include("Days").FirstOrDefaultAsync(s => s.Name == name);

            if (service == null)
            {
                return NotFound();
            }

            return service;
        }

        // PUT: api/Services/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutService(int id, Service service)
        {
            if (id != service.ServiceId)
            {
                return BadRequest();
            }

            _context.Entry(service).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceExists(id))
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

        // POST: api/Services
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Service>> PostService(Service service)
        {
            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetService", new { id = service.ServiceId }, service);
        }

        [HttpPost("Days/{id}")]
        public async Task<ActionResult<Service>> PostDay(int id, Day day)
        {
            try
            {
                if(day == null)
                {
                    return BadRequest();
                }
                var service = await _context.Services.Include("Days").FirstOrDefaultAsync(s => s.ServiceId == id);
                service.Days.Add(day);
                await _context.SaveChangesAsync();
                return service;
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                   "Error adding new day");
            }
        }

        // DELETE: api/Services/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services.Include("Days").FirstOrDefaultAsync(s => s.ServiceId == id);
            if (service == null)
            {
                return NotFound();
            }

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ServiceExists(int id)
        {
            return _context.Services.Any(e => e.ServiceId == id);
        }
    }
}
