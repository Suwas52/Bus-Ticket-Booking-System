using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusBooking.Constants
{
    public class StaticRoleUser
    {
        public const string SUPERADMIN = "SUPERADMIN";
        public const string ADMIN = "ADMIN";
        public const string STAFF = "STAFF";
        public const string USER = "USER";
        public const string SuperAdminAndAdmin = "SUPERADMIN,ADMIN";
        public const string SuperAdminAdminAndStaff = "SUPERADMIN,ADMIN,STAFF";


    }
}