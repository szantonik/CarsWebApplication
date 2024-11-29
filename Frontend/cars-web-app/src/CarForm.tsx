import React, { FormEvent, useEffect, useState } from 'react'
import { BodyType, Car, FuelType } from './Models/Car';
import { createNewCar, editCar, getCarDetails } from './helpers/api';
import { useParams } from 'react-router-dom';

function CarForm() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const  today = new Date();
  const todayString = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

  useEffect(() => {
    console.log('Car ID:', id); // Log the id to verify
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

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (car) {
//       // Zapisujemy zmiany auta (tutaj np. wywołanie API lub zapis do stanu globalnego)
//       console.log('Updated Car:', car);
//     }
//   };

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (car) {
      try {
        if (id === 'new') {
          await createNewCar(car);
          alert('Car created successfully');
        } else {
          await editCar(car);
          alert('Car updated successfully');
        }
      } catch (error: any) {
        alert(error.message || 'Failed to save car');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return car ? (
    <div className="bg-slate-400 min-w-[200px]">
    <h2>{id == 'new' ? 'Add car' : 'Edit car'}</h2>
    <form onSubmit={handleSubmit} className="car-form">
        <table>
            <tbody>
            <tr>
                <td>Brand: </td>
                <td> <input  type="text"
                            name="brand"
                            value={car.brand} 
                            onChange={handleChange}
                            required /></td>
            </tr>
            <tr>
                <td>Model:</td>
                <td><input  type="text"
                        name="model"
                        value={car.model} 
                        onChange={handleChange}
                        required /></td>
            </tr>
            <tr>
                <td>Doors number:</td>
                <td><input  type="number"
                        name="doorsNumber"
                        value={car.doorsNumber} 
                        onChange={handleChange}
                        required /></td>
            </tr>
            <tr>
                <td>Luggage capacity [l]:</td>
                <td><input  type="number"
                        name="luggageCapacity"
                        value={car.luggageCapacity} 
                        onChange={handleChange}
                        required /></td>
            </tr>
            <tr>
                <td>Engine capacity [cm3]:</td>
                <td><input  type="number"
                        name="engineCapacity"
                        value={car.engineCapacity} 
                        onChange={handleChange}
                        required /></td>
            </tr>
            <tr>
                <td>Production date:</td>
                <td><input  type="date"
                        name="productionDate"
                        value={car.productionDate.substring(0,10)}
                        max={todayString}
                        onChange={handleChange}
                        required /></td>
            </tr>
            <tr>
                <td>Fuel type:</td>
                <td><select name="fuelType"
                        value={car.fuelType} 
                        onChange={handleChange}
                        required>
                    <option value={FuelType.Petrol}>Petrol</option>
                    <option value={FuelType.Diesel}>Diesel</option>
                    <option value={FuelType.Hybrid}>Hybrid</option>
                    <option value={FuelType.LPG}>LPG</option>
                    <option value={FuelType.Electric}>Electric</option>
                </select></td>
            </tr>
            <tr>
                <td>Fuel consumption [l/100km]:</td>
                <td><input  type="number"
                        name="carFuelConsumption"
                        value={car.carFuelConsumption} 
                        onChange={handleChange}
                        required /></td>
            </tr>
            <tr>
                <td>Body type:</td>
                <td><select name="bodyType"
                        value={car.bodyType} 
                        onChange={handleChange}
                        required>
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
        <button type="submit" className="btn-create">Save</button>
    </form>
</div>
  ) : (
    <div>No car data available</div>
  );
};
export default CarForm;



// interface CarFormProps {
//   onAddCar: (car: Car) => void;
// }

// function CarForm() {
//   const  today = new Date();
//     const todayString = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

//     const [formData, setFormData] = useState({
//         brand: '',
//         model: '',
//         doorsNumber: '2',
//         luggageCapacity: '0',
//         engineCapacity: '0',
//         productionDate: '',
//         fuelType: FuelType.Petrol,
//         carFuelConsumption: '0',
//         bodyType: BodyType.Coupe
//     });

//     // const resetForm = () => {
//     //     setFormData({
//     //         brand: '',
//     //         model: '',
//     //         doorsNumber: 2,
//     //         luggageCapacity: 0,
//     //         engineCapacity: 0,
//     //         productionDate: '',
//     //         fuelType: FuelType.Petrol,
//     //         carFuelConsumption: 0,
//     //         bodyType: BodyType.Coupe
//     //     });
//     // }

//     const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData, [name]: value,
//         }));
//     };

//     // const handleSubmit = async (e: FormEvent) => {
//     //     e.preventDefault();
//     //     const newCar: Car = {
//     //         id: crypto.randomUUID(),
//     //         brand: formData.brand,
//     //         model: formData.model,
//     //         doorsNumber: formData.doorsNumber,
//     //         luggageCapacity: formData.luggageCapacity,
//     //         engineCapacity: formData.engineCapacity,
//     //         productionDate: formData.productionDate,
//     //         fuelType: formData.fuelType,
//     //         carFuelConsumption: formData.carFuelConsumption,
//     //         bodyType: formData.bodyType
//     //     };
//     //     // props.onAddCar(newCar);
//     //     try {
//     //       await saveChangesAsync(newCar);
//     //       // resetForm();
//     //     } catch (error) {
//     //       console.log(error);
//     //     }
//     // }

//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
      
//         const newCar: Car = {
//           id: crypto.randomUUID(),
//           brand: formData.brand,
//           model: formData.model,
//           doorsNumber: parseInt(formData.doorsNumber, 10), // Ensure numeric values
//           luggageCapacity: parseInt(formData.luggageCapacity, 10),
//           engineCapacity: parseInt(formData.engineCapacity, 10),
//           fuelType: formData.fuelType as FuelType, // Ensure proper enum type
//           productionDate: new Date(formData.productionDate).toISOString(), // Convert to ISO
//           carFuelConsumption: parseFloat(formData.carFuelConsumption),
//           bodyType: formData.bodyType as BodyType,
//         };
      
//         try {
//           await saveChangesAsync(newCar);
//         } catch (error) {
//           console.error(error);
//         }
//       };

//     const saveChangesAsync = async (car: Car) => {
//         try {
//           const response = await createNewCar(car);
//           alert(`Car created successfully: ${response}`);
//         } catch (error) {
//           console.error('Error creating car:', error);
//         }
//       };

//     return(
        // <div className="bg-slate-400 min-w-[200px]">
        //     <h2>Add car</h2>
        //     <form onSubmit={handleSubmit} className="car-form">
        //         <table>
        //             <tbody>
        //             <tr>
        //                 <td>Brand: </td>
        //                 <td> <input  type="text"
        //                             name="brand"
        //                             value={formData.brand} 
        //                             onChange={handleChange}
        //                             required /></td>
        //             </tr>
        //             <tr>
        //                 <td>Model:</td>
        //                 <td><input  type="text"
        //                         name="model"
        //                         value={formData.model} 
        //                         onChange={handleChange}
        //                         required /></td>
        //             </tr>
        //             <tr>
        //                 <td>Doors number:</td>
        //                 <td><input  type="number"
        //                         name="doorsNumber"
        //                         value={formData.doorsNumber} 
        //                         onChange={handleChange}
        //                         required /></td>
        //             </tr>
        //             <tr>
        //                 <td>Luggage capacity [l]:</td>
        //                 <td><input  type="number"
        //                         name="luggageCapacity"
        //                         value={formData.luggageCapacity} 
        //                         onChange={handleChange}
        //                         required /></td>
        //             </tr>
        //             <tr>
        //                 <td>Engine capacity [cm3]:</td>
        //                 <td><input  type="number"
        //                         name="engineCapacity"
        //                         value={formData.engineCapacity} 
        //                         onChange={handleChange}
        //                         required /></td>
        //             </tr>
        //             <tr>
        //                 <td>Production date:</td>
        //                 <td><input  type="date"
        //                         name="productionDate"
        //                         value={formData.productionDate}
        //                         max={todayString}
        //                         onChange={handleChange}
        //                         required /></td>
        //             </tr>
        //             <tr>
        //                 <td>Fuel type:</td>
        //                 <td><select name="fuelType"
        //                         value={formData.fuelType} 
        //                         onChange={handleChange}
        //                         required>
        //                     <option value={FuelType.Petrol}>Petrol</option>
        //                     <option value={FuelType.Diesel}>Diesel</option>
        //                     <option value={FuelType.Hybrid}>Hybrid</option>
        //                     <option value={FuelType.LPG}>LPG</option>
        //                     <option value={FuelType.Electric}>Electric</option>
        //                 </select></td>
        //             </tr>
        //             <tr>
        //                 <td>Fuel consumption [l/100km]:</td>
        //                 <td><input  type="number"
        //                         name="carFuelConsumption"
        //                         value={formData.carFuelConsumption} 
        //                         onChange={handleChange}
        //                         required /></td>
        //             </tr>
        //             <tr>
        //                 <td>Body type:</td>
        //                 <td><select name="bodyType"
        //                         value={formData.bodyType} 
        //                         onChange={handleChange}
        //                         required>
        //                     <option value={BodyType.Coupe}>Coupe</option>
        //                     <option value={BodyType.Hatchback}>Hatchback</option>
        //                     <option value={BodyType.Kombi}>Kombi</option>
        //                     <option value={BodyType.Roadster}>Roadster</option>
        //                     <option value={BodyType.SUV}>SUV</option>
        //                     <option value={BodyType.Sedan}>Sedan</option>
        //                 </select></td>
        //             </tr>
        //             </tbody>
        //         </table>
        //         <button type="submit" className="btn-create">Create</button>
        //     </form>
        // </div>
//     );
// };


// export default CarForm