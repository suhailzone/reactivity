using Application.Errors;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;

        public ProfileReader(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Profile> ReadProfile(string username)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                throw new RestException(System.Net.HttpStatusCode.NotFound, new { User = "No user found"});

            var currentUser = await _dataContext.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUserName());

            var profile = new Profile
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Image = user.Photos.FirstOrDefault(x => x.IsMain)?.Url,
                Bio = user.Bio,
                Photos = user.Photos,
                FollowersCount = user.Followers.Count(),
                FollowingCount = user.Followings.Count()
            };
            if (currentUser.Followings.Any(x => x.TargetId == user.Id))
                profile.IsFollowed = true;

            return profile;

        }
    }
}
