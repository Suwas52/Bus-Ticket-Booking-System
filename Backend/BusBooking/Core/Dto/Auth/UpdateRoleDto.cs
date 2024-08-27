using System.ComponentModel.DataAnnotations;

namespace BusBooking.Core.Dto.Auth
{
    public class UpdateRoleDto
    {
        [Required(ErrorMessage = " UserName is required")]
        public string UserName { get; set; }
        public RoleType NewRole { get; set; }
    }

    public enum RoleType
    {
        SUPERADMIN,
        ADMIN,
        STAFF,
        USER
    }
}
