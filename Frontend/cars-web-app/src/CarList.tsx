import { useEffect, useState } from 'react'
import { Car } from './Models/Car';
import { deleteCar, getAllCars } from './helpers/api';
import { useNavigate } from 'react-router-dom';

function CarList() {

  const [carList, setCarList] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updater, setUpdater] = useState(0);

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
  }, [updater]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

  const handleDelete = async (car: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
        await deleteCar(car);
        setUpdater(u => u+1);
        alert('Car deleted successfully');
      } catch (error: any) {
      alert(error.message || 'Failed to delete car');
    }
  } 


  return (
    <div className="flex flex-col">
      <h2 className='text-white font-bold text-2xl text-center px-auto'>Cars</h2>
      {carList.map((car) => (
        <div
            key={car.id}
            className="flex items-center justify-between bg-background-200 m-1 p-4 rounded min-w-[450px]"
          >
          <p className="text-lg font-medium text-tertiary">
            {car.brand} {car.model}
          </p>

          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/cars/${car.id}`)}
              className="btn btn-primary"
            >
              Details
            </button>
            <button
              onClick={() => navigate(`/edit/${car.id}`)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(car.id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CarList