using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Attend
    {
        public class Command: IRequest
        {
            public Guid Id { get; set; }
        }
        
                public class Handler: IRequestHandler<Command>
                {
                    private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
                    public Handler(DataContext context, IUserAccessor userAccessor)
                    {
                        _context = context;
                _userAccessor = userAccessor;
                    }
        
                    public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
                    {
                var activity = await _context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Could not find Activity" });

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(x => x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if (attendance != null)
                    throw new RestException(HttpStatusCode.BadRequest, new {Attendance = "Already attending this activity" });

                attendance = new UserActivity
                {
                    Activity = activity,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                _context.UserActivities.Add(attendance);
                
                var result =  await _context.SaveChangesAsync() > 0;
                        if(result) return Unit.Value;
        
                        
                throw new Exception("Problem Creating Actvity");
                
            }
                
        }
    }
}
