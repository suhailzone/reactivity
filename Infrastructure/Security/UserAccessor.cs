using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Security
{
    public class UserAccessor: IUserAccessor
    {
        public UserAccessor(IHttpContextAccessor httpContextAccessor)
        {
            HttpContextAccessor = httpContextAccessor;
        }

        private readonly IHttpContextAccessor HttpContextAccessor;

        public string GetCurrentUserName()
        {
            var username = HttpContextAccessor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            return username;
        }
    }
}
