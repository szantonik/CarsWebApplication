import { useEffect, useState } from 'react'
import { BodyType, Car, FuelType } from './Models/Car';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarDetails } from './helpers/api';

function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCarDetails = async () => {
      setLoading(true);
      setError(null);
      if (id) {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

  return(
<div className="text-white flex-col mt-2">
  <table className="mx-auto table-auto border-collapse w-max-[1000px] w-min-[450px]">
    <tbody>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2 w-1/2">Brand</td>
        <td className="text-lg border p-2 w-1/2">{car?.brand}</td>
      </tr>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2">Model</td>
        <td className="text-lg border p-2">{car?.model}</td>
      </tr>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2">Doors number</td>
        <td className="text-lg border p-2">{car?.doorsNumber}</td>
      </tr>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2">Luggage capacity</td>
        <td className="text-lg border p-2">{car?.luggageCapacity}</td>
      </tr>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2">Engine capacity</td>
        <td className="text-lg border p-2">{car?.engineCapacity}</td>
      </tr>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2">Production date</td>
        <td className="text-lg border p-2">{car?.productionDate.substring(0, 10)}</td>
      </tr>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2">Fuel type</td>
        <td className="text-lg border p-2">{car && FuelType[car?.fuelType]}</td>
      </tr>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2">Fuel consumption</td>
        <td className="text-lg border p-2">{car?.carFuelConsumption}</td>
      </tr>
      <tr className="odd:bg-background-200">
        <td className="td-label font-semibold text-lg text-gray-300 border p-2">Body type</td>
        <td className="text-lg border p-2">{car && BodyType[car?.bodyType]}</td>
      </tr>
    </tbody>
  </table>
  <div className="flex justify-center mt-4">
    <button onClick={() => navigate('/cars')} className="btn btn-secondary">
      Close
    </button>
  </div>
</div>
  );
}

export default CarDetails