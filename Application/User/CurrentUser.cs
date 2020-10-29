using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class CurrentUser
    {
         public class Query : IRequest<User> {}
        
         public class Handler: IRequestHandler<Query, User>
         {
        
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                UserManager = userManager;
                JwtGenerator = jwtGenerator;
                UserAccessor = userAccessor;
            }

            public UserManager<AppUser> UserManager { get; }
            public IJwtGenerator JwtGenerator { get; }
            public IUserAccessor UserAccessor { get; }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
                    {
                var user = await UserManager.FindByNameAsync(UserAccessor.GetCurrentUserName());
                return new User
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = JwtGenerator.CreateToken(user),
                    Image = null
                };
                    }
                }
    }
}
