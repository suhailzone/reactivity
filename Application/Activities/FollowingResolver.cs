using System;
using System.Collections.Generic;
using AutoMapper;
using System.Text;
using Domain;
using Application.Interfaces;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDTO, bool>
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public FollowingResolver(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public bool Resolve(UserActivity source, AttendeeDTO destination, bool destMember, ResolutionContext context)
        {
            var currentUser = _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName()).Result;

            if (currentUser.Followings.Any(x => x.TargetId == source.AppUserId))
                return true;

            return false;
        }
    }
}
