import React, { useEffect, useState } from 'react'
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
    <div className="car-details-container">
        <table>
            <tbody>
            <tr>
                <td className="td-label">Brand</td>
                <td>{car?.brand}</td>
            </tr>
            <tr>
                <td className="td-label">Model</td>
                <td>{car?.model}</td>
            </tr>
            <tr>
                <td className="td-label">Doors number</td>
                <td>{car?.doorsNumber}</td>
            </tr>
            <tr>
                <td className="td-label">Luggage capacity</td>
                <td>{car?.luggageCapacity}</td>
            </tr>
            <tr>
                <td className="td-label">Engine capacity</td>
                <td>{car?.engineCapacity}</td>
            </tr>
            <tr>
                <td className="td-label">Production date</td>
                <td>{car?.productionDate.substring(0,10)}</td>
            </tr>
            <tr>
                <td className="td-label">Fuel type</td>
                <td>{car && FuelType[car?.fuelType]}</td>
            </tr>
            <tr>
                <td className="td-label">Fuel consumption</td>
                <td>{car?.carFuelConsumption}</td>
            </tr>
            <tr>
                <td className="td-label">Body type</td>
                <td>{car && BodyType[car?.bodyType]}</td>
            </tr>
            </tbody>
        </table>
        <button onClick={() => navigate('/cars')}>Close</button>
    </div>
);
}

export default CarDetails