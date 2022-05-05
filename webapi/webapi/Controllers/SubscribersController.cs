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
    public class SubscribersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SubscribersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Subscribers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subscriber>>> GetSubscribers()
        {
            return await _context.Subscribers.Include("Notifications").ToListAsync();
        }

        // GET: api/Subscribers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subscriber>> GetSubscriber(int id)
        {
            var subscriber = await _context.Subscribers.Include("Notifications").FirstOrDefaultAsync(item => item.SubscriberId == id);

            if (subscriber == null)
            {
                return NotFound();
            }

            return subscriber;
        }

        // PUT: api/Subscribers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSubscriber(int id, Subscriber subscriber)
        {
            if (id != subscriber.SubscriberId)
            {
                return BadRequest();
            }

            _context.Entry(subscriber).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubscriberExists(id))
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

        // POST: api/Subscribers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Subscriber>> PostSubscriber(Subscriber subscriber)
        {
            _context.Subscribers.Add(subscriber);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSubscriber", new { id = subscriber.SubscriberId }, subscriber);
        }

        // DELETE: api/Subscribers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubscriber(int id)
        {
            var subscriber = await _context.Subscribers.FindAsync(id);
            if (subscriber == null)
            {
                return NotFound();
            }

            _context.Subscribers.Remove(subscriber);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SubscriberExists(int id)
        {
            return _context.Subscribers.Any(e => e.SubscriberId == id);
        }

        [HttpPost("{id}")]
        public async Task<ActionResult<Subscriber>> PostNotification(int id, Notification notification)
        {
            try
            {
                var subscriber = await _context.Subscribers.Include("Notifications").FirstOrDefaultAsync(item => item.SubscriberId == id);

                if (subscriber == null)
                {
                    return BadRequest();
                }

                //var notification = await _context.Notifications.FindAsync(notificationId);

                if (notification == null)
                {
                    return BadRequest();
                }
                subscriber.Notifications.Add(notification);
                await _context.SaveChangesAsync();
                return subscriber;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                                 "Error adding new service");
            }
        }

        [HttpDelete("{id}/{notificationId}")]
        public async Task<ActionResult<Subscriber>> DeleteNotification(int id, int notificationId)
        {
            try
            {
                var subscriber = await _context.Subscribers.Include("Notifications").FirstOrDefaultAsync(item => item.SubscriberId == id);

                if (subscriber == null)
                {
                    return BadRequest();
                }

                var notification = await _context.Notifications.FindAsync(notificationId);

                if (notification == null)
                {
                    return BadRequest();
                }
                subscriber.Notifications.Remove(notification);
                await _context.SaveChangesAsync();
                return subscriber;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                                 "Error adding new service");
            }
        }
    }
}
