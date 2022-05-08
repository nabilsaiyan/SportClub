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
    public class SubscriptionsController : ControllerBase
    {
        private readonly AppDbContext _context;
        

        public SubscriptionsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Subscriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subscription>>> GetSubscriptions()
        {
            return await _context.Subscriptions.Include("Services.Days").ToListAsync();
        }

        // GET: api/Subscriptions/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Subscription>> GetSubscription(int id)
        {
            var subscription = await _context.Subscriptions.Include("Services.Days").FirstOrDefaultAsync(item => item.SubscriptionId == id);

            if (subscription == null)
            {
                return NotFound();
            }

            return subscription;
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<Subscription>> GetSubscription(string name)
        {
            var subscription = await _context.Subscriptions.Include("Services.Days").FirstOrDefaultAsync(item => item.Title == name);

            if (subscription == null)
            {
                return NotFound();
            }

            return subscription;
        }


        // PUT: api/Subscriptions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubscription(int id, Subscription subscription)
        {
            if (id != subscription.SubscriptionId)
            {
                return BadRequest();
            }

            _context.Entry(subscription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriptionExists(id))
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

        // POST: api/Subscriptions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Subscription>> PostSubscription(Subscription subscription)
        {
            _context.Subscriptions.Add(subscription);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubscription", new { id = subscription.SubscriptionId }, subscription);
        }

        // DELETE: api/Subscriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscription(int id)
        {
            var subscription = await _context.Subscriptions.FindAsync(id);
            if (subscription == null)
            {
                return NotFound();
            }

            _context.Subscriptions.Remove(subscription);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubscriptionExists(int id)
        {
            return _context.Subscriptions.Any(e => e.SubscriptionId == id);
        }

        [HttpPost("{id}/{serviceId}")]
        public async Task<ActionResult<Subscription>> PostService(int id, int serviceId)
        {
            try
            {
                var subscription = await _context.Subscriptions.Include("Services.Days").FirstOrDefaultAsync(item => item.SubscriptionId == id);
                
                if(subscription == null)
                {
                    return BadRequest();
                }

                var service = await _context.Services.Include("Days").FirstOrDefaultAsync(s => s.ServiceId == serviceId);
                
                if (service == null)
                {
                    return BadRequest();
                }
                subscription.Services.Add(service);
                await _context.SaveChangesAsync();
                return subscription;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                                 "Error adding new service");
            }
        }
    }
}
