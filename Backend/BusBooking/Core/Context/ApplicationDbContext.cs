
using BusBooking.Core.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BusBooking.Core.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Log> Logs { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Routes> Routes { get; set; }
        public DbSet<BusSchedule> BusSchedules { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Price> Prices { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>(e =>
            {
                e.ToTable("Users");
            });

            builder.Entity<IdentityUserClaim<string>>(e =>
            {
                e.ToTable("UserClaims");
            });

            builder.Entity<IdentityUserLogin<string>>(e =>
            {
                e.ToTable("UserLogins");
            });

            builder.Entity<IdentityUserToken<string>>(e =>
            {
                e.ToTable("UserTokens");
            });

            builder.Entity<IdentityRole>(e =>
            {
                e.ToTable("Roles");
            });

            builder.Entity<IdentityRoleClaim<string>>(e =>
            {
                e.ToTable("RoleClaims");
            });

            builder.Entity<IdentityUserRole<string>>(e =>
            {
                e.ToTable("UserRoles");
            });


        }
    }
}