using Cars.Application.Cars;
using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Cars.API.Controllers
{
    public class CarsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Car>>> GetCars()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> EditCar(Guid id, Car car)
        {
            car.Id = id;
            await Mediator.Send(new Edit.Command { Car = car });
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> CreateCar([FromBody] Car car)
        {
            var createdCar = await Mediator.Send(new Create.Command { Car = car });
            return CreatedAtAction(nameof(GetCar), new { id = createdCar.Id }, createdCar);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(Guid id)
        {
            try
            {
                await Mediator.Send(new Delete.Command { Id = id });
                return NoContent();
            }
            catch (Exception ex)
            {
                return NotFound(new { Error = ex.Message });
            }
        }
    }
}
