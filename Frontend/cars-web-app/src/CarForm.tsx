import React, { FormEvent, useState } from 'react'
import { BodyType, Car, FuelType } from './Models/Car';

// interface CarFormProps {
//   onAddCar: (car: Car) => void;
// }

function CarForm() {
  const  today = new Date();
    const todayString = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        doorsNumber: 2,
        luggageCapacity: 0,
        engineCapacity: 0,
        productionDate: '',
        fuelType: FuelType.Petrol,
        carFuelConsumption: 0,
        bodyType: BodyType.Coupe
    });

    const resetForm = () => {
        setFormData({
            brand: '',
            model: '',
            doorsNumber: 2,
            luggageCapacity: 0,
            engineCapacity: 0,
            productionDate: '',
            fuelType: FuelType.Petrol,
            carFuelConsumption: 0,
            bodyType: BodyType.Coupe
        });
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newCar: Car = {
            id: crypto.randomUUID(),
            brand: formData.brand,
            model: formData.model,
            doorsNumber: formData.doorsNumber,
            luggageCapacity: formData.luggageCapacity,
            engineCapacity: formData.engineCapacity,
            productionDate: formData.productionDate,
            fuelType: formData.fuelType,
            carFuelConsumption: formData.carFuelConsumption,
            bodyType: formData.bodyType
        };
        // props.onAddCar(newCar);
        try {
          await saveChangesAsync();
          resetForm();
        } catch (error) {
          console.log(error);
        }
    }

    const saveChangesAsync = async () => {

    }

    return(
        <div className="bg-slate-400 min-w-[200px]">
            <h2>Add car</h2>
            <form onSubmit={handleSubmit} className="car-form">
                <table>
                    <tbody>
                    <tr>
                        <td>Brand: </td>
                        <td> <input  type="text"
                                    name="brand"
                                    value={formData.brand} 
                                    onChange={handleChange}
                                    required /></td>
                    </tr>
                    <tr>
                        <td>Model:</td>
                        <td><input  type="text"
                                name="model"
                                value={formData.model} 
                                onChange={handleChange}
                                required /></td>
                    </tr>
                    <tr>
                        <td>Doors number:</td>
                        <td><input  type="number"
                                name="doorsNumber"
                                value={formData.doorsNumber} 
                                onChange={handleChange}
                                required /></td>
                    </tr>
                    <tr>
                        <td>Luggage capacity [l]:</td>
                        <td><input  type="number"
                                name="luggageCapacity"
                                value={formData.luggageCapacity} 
                                onChange={handleChange}
                                required /></td>
                    </tr>
                    <tr>
                        <td>Engine capacity [cm3]:</td>
                        <td><input  type="number"
                                name="engineCapacity"
                                value={formData.engineCapacity} 
                                onChange={handleChange}
                                required /></td>
                    </tr>
                    <tr>
                        <td>Production date:</td>
                        <td><input  type="date"
                                name="productionDate"
                                value={formData.productionDate}
                                max={todayString}
                                onChange={handleChange}
                                required /></td>
                    </tr>
                    <tr>
                        <td>Fuel type:</td>
                        <td><select name="fuelType"
                                value={formData.fuelType} 
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
                                value={formData.carFuelConsumption} 
                                onChange={handleChange}
                                required /></td>
                    </tr>
                    <tr>
                        <td>Body type:</td>
                        <td><select name="bodyType"
                                value={formData.bodyType} 
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
                <button type="submit" className="btn-create">Create</button>
            </form>
        </div>
    );
};


export default CarForm