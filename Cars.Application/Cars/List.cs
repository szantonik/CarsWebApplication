﻿using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization.DataContracts;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class List
    {
        public class Query : IRequest<List<Car>> { }

        public class Handler : IRequestHandler<Query, List<Car>>
        {
            // Pass data context
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Car>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Cars.ToListAsync();
            }
        }
    }
}
