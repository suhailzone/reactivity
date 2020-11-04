using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProfilesController: BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username)
        {
            return await Mediator.Send(new Application.Profiles.Details.Query {Username = username });
        }

        [HttpPut]
        public async Task<ActionResult<Unit>> SetInfo(InfoUpdate.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}
