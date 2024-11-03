using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Cars.Application.Cars
{
    public class Edit
    {
        public class Command : IRequest<Unit>
        {
            public required Car Car { get; set; }
        }

        public class Handler : IRequestHandler<Command, Unit>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Fetch car from database by ID
                var car = await _context.Cars.FindAsync(request.Car.Id);

                car.Brand = request.Car.Brand ?? car.Brand;
                car.Model = request.Car.Model ?? car.Model;
                car.DoorsNumber = request.Car.DoorsNumber;
                car.LuggageCapacity = request.Car.LuggageCapacity;
                car.EngineCapacity = request.Car.EngineCapacity;
                car.FuelType = request.Car.FuelType;
                car.ProductionDate = request.Car.ProductionDate;
                car.CarFuelConsumption = request.Car.CarFuelConsumption;
                car.BodyType = request.Car.BodyType;

                // Save changes
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }

}
