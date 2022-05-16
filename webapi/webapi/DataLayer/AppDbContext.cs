using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using webapi.Models;

namespace webapi.DataLayer
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {

        }
        public DbSet<Material> Materials { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Instructor> Instructor { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Subscriber> Subscribers { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Day> Days { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Subscription>()
                 .Property(e => e.Description)
                 .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }


        public DbSet<webapi.Models.Newsletter> Image { get; set; }
    }

}
