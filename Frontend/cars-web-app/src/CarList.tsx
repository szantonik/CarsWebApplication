import { useEffect, useState } from 'react'
import { Car } from './Models/Car';
import { getAllCars } from './helpers/api';
import { useNavigate } from 'react-router-dom';

function CarList() {

  const [carList, setCarList] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()

  useEffect(() => {

    const fetchCars = async () => {
      setLoading(true); 
      setError(null);
      try {
        const cars = await getAllCars();
        if (cars) setCarList(cars);
      } catch (error: any) {
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCars(); 
  }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


  return (
    <div className="cars-container">
            <h2>Cars</h2>
            {carList.map(car => (
                <div key={car.id} className="car">
                    <p>{car.brand} {car.model}</p>
                    <button  onClick={() => navigate(`/cars/${car.id}`)}>Details</button>
                    <button  onClick={() => navigate(`/edit/${car.id}`)}>Edit</button>
                </div>
            ))}
        </div>
  )
}

export default CarList