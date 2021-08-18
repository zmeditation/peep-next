﻿using System;
using Microsoft.AspNetCore.Identity;

namespace Peep.Stork.Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string Name { get; set; }
        public string BirthDate { get; set; }
        public string Password { get; set; }
        public DateTime JoinedAt { get; set; }
    }
}