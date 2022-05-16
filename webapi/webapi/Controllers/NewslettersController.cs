﻿using System;
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
    public class NewslettersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public NewslettersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Newsletters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Newsletter>>> GetImage()
        {
            return await _context.Image.ToListAsync();
        }

        // GET: api/Newsletters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Newsletter>> GetNewsletter(int id)
        {
            var newsletter = await _context.Image.FindAsync(id);

            if (newsletter == null)
            {
                return NotFound();
            }

            return newsletter;
        }

        // PUT: api/Newsletters/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewsletter(int id, Newsletter newsletter)
        {
            if (id != newsletter.Id)
            {
                return BadRequest();
            }

            _context.Entry(newsletter).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsletterExists(id))
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

        // POST: api/Newsletters
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Newsletter>> PostNewsletter(Newsletter newsletter)
        {
            _context.Image.Add(newsletter);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetNewsletter", new { id = newsletter.Id }, newsletter);
        }

        // DELETE: api/Newsletters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNewsletter(int id)
        {
            var newsletter = await _context.Image.FindAsync(id);
            if (newsletter == null)
            {
                return NotFound();
            }

            _context.Image.Remove(newsletter);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NewsletterExists(int id)
        {
            return _context.Image.Any(e => e.Id == id);
        }
    }
}
