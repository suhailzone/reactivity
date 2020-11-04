using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class Create
    {
        public class Command: IRequest<CommentsDTO>
        {
            public string  Body { get; set; }
            public Guid ActivityId { get; set; }
            public string Username  { get; set; }
        }

        public class Handler: IRequestHandler<Command, CommentsDTO>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CommentsDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                if (activity == null)
                    throw new RestException(System.Net.HttpStatusCode.NotFound, new {Activity = "Not found" });

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == request.Username);

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comment.Add(comment);


                var result =  await _context.SaveChangesAsync() > 0;

                if(result) return _mapper.Map<CommentsDTO>(comment);

                throw new Exception("Problem Creating Actvity");
            }

        }
    }
}