import React, { FormEvent, useEffect, useState } from 'react'
import { BodyType, Car, FuelType } from './Models/Car';
import { createNewCar, editCar, getCarDetails } from './helpers/api';
import { useNavigate, useParams } from 'react-router-dom';

function CarForm() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const  today = new Date();
  const todayString = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      setError(null);
      if (id) {
        if (id == 'new') {
            const newCar: Car = {
                id: crypto.randomUUID(),
                brand: '',
                model: '',
                doorsNumber: 2,
                luggageCapacity: 0,
                engineCapacity: 0,
                productionDate: '',
                fuelType: FuelType.Diesel,
                carFuelConsumption: 0,
                bodyType: BodyType.Coupe
            };
            setCar(newCar);
            setLoading(false);
            return;
        }
        try {
          const selectedCar = await getCarDetails(id);
          if (selectedCar) {
            setCar(selectedCar);
          } else {
            setError('Car not found');
          }
        } catch (error: any) {
          setError(error.message || 'An error occurred');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (car) {
      const { name, value } = e.target;
      setCar({
        ...car,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (car) {
        try {
            let response;
            if (id === 'new') {
                response = await createNewCar(car);
            } else {
                response = await editCar(car);
            }

            if (response.status === 200) {
                alert(id === 'new' ? 'Car created successfully' : 'Car updated successfully');
            } else if (response.status === 404) {
                alert('Car not found');
            } else if (response.status === 400) {
                const errors = response.message;
                const errorMessages = Object.values(errors).flat().join('\n');
                alert(`Validation errors:\n\n${errorMessages}`);
            } else {
                alert('Failed to save car');
            }
        } catch (error: any) {
            alert(error.message || 'Failed to save car');
        }
    }
};

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return car ? (
    <div className="bg-background m-2 p-3 rounded-lg shadow-lg min-w-[300px] mx-auto w-1/2">
      <h2 className="text-white font-bold text-2xl text-center mb-2">{id === 'new' ? 'Add Car' : 'Edit Car'}</h2>
      <form onSubmit={handleSubmit}>
        <table className="table-auto mx-auto w-full">
          <tbody>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Brand: </td>
              <td><input
                type="text"
                name="brand"
                value={car.brand}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background-200"
              /></td>
            </tr>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Model:</td>
              <td><input
                type="text"
                name="model"
                value={car.model}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background"
              /></td>
            </tr>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Doors number:</td>
              <td><input
                type="number"
                name="doorsNumber"
                value={car.doorsNumber}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background-200"
              /></td>
            </tr>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Luggage capacity [l]:</td>
              <td><input
                type="number"
                name="luggageCapacity"
                value={car.luggageCapacity}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background"
              /></td>
            </tr>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Engine capacity [cm3]:</td>
              <td><input
                type="number"
                name="engineCapacity"
                value={car.engineCapacity}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background-200"
              /></td>
            </tr>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Production date:</td>
              <td><input
                type="date"
                name="productionDate"
                value={car.productionDate.substring(0, 10)}
                max={todayString}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background"
              /></td>
            </tr>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Fuel type:</td>
              <td><select
                name="fuelType"
                value={car.fuelType}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background-200"
              >
                <option value={FuelType.Petrol}>Petrol</option>
                <option value={FuelType.Diesel}>Diesel</option>
                <option value={FuelType.Hybrid}>Hybrid</option>
                <option value={FuelType.LPG}>LPG</option>
              </select></td>
            </tr>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Fuel consumption [l/100km]:</td>
              <td><input
                type="number"
                name="carFuelConsumption"
                value={car.carFuelConsumption}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background"
              /></td>
            </tr>
            <tr className="odd:bg-background-200">
              <td className="td-label font-semibold text-gray-300 p-2">Body type:</td>
              <td><select
                name="bodyType"
                value={car.bodyType}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-background-200"
              >
                <option value={BodyType.Coupe}>Coupe</option>
                <option value={BodyType.Hatchback}>Hatchback</option>
                <option value={BodyType.Kombi}>Kombi</option>
                <option value={BodyType.Roadster}>Roadster</option>
                <option value={BodyType.SUV}>SUV</option>
                <option value={BodyType.Sedan}>Sedan</option>
              </select></td>
            </tr>
          </tbody>
        </table>
        <div className="w-full flex justify-between mt-4">
          <button
            type="submit"
            className="btn-create w-4/5 py-2 btn-success text-white font-semibold rounded-md"
          >
            Save
          </button>
          <button
            type='button'
            className="btn-create w-1/5 py-2 btn-danger text-white font-semibold rounded-md"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div>No car data available</div>
  );
};
export default CarForm;