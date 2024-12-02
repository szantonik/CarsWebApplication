import axios from "axios";
import { Car } from "../Models/Car";

const API_URL = "https://localhost:7052/api/Cars"

export const getAllCars = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log('Error Response:', error.response);
            throw new Error(`Error: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            console.log('Error Request:', error.request);
            throw new Error('No response received from the server');
        } else {
            console.log('General Error:', error.message);
            throw new Error('Error fetching cars');
        }
    }
}

export const getCarDetails = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.log('Error Response:', error.response);
            throw new Error(`Error: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            console.log('Error Request:', error.request);
            throw new Error('No response received from the server');
        } else {
            console.log('General Error:', error.message);
            throw new Error('Error fetching car details');
        }
    }
}

export const createNewCar = async (car: Car) => {
    const carToSend = {
        ...car,
        fuelType: Number(car.fuelType),
        bodyType: Number(car.bodyType),
    };

    try {
        const response = await axios.post(API_URL, carToSend);
        if (!response.data) {
            return { status: 404, message: 'Not Found' };
        }
        return { status: 200, data: response.data };
    } catch (error: any) {
        // console.error('Error creating car:', error.response?.data || error.message);
        if (error.response?.status === 400) {
            return { status: 400, message: error.response.data.errors || 'Bad Request' };
        }
        return { status: 500, message: 'Failed to create car' };
    }
};

export const editCar = async (car: Car) => {
    const carToSend = {
        ...car,
        fuelType: Number(car.fuelType),
        bodyType: Number(car.bodyType),
    };

    try {
        const response = await axios.put(`${API_URL}/${car.id}`, carToSend);
        if (!response.data) {
            return { status: 404, message: 'Not Found' };
        }
        return { status: 200, data: response.data };
    } catch (error: any) {
        // console.error('Error editing car:', error.response?.data || error.message);
        if (error.response?.status === 400) {
            return { status: 400, message: error.response.data.errors || 'Bad Request' };
        }
        return { status: 500, message: 'Failed to edit car' };
    }
};


export const deleteCar = async (carId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/${carId}`);
        return response.data;
    } catch (error: any) {
        console.error('Error deleting car:', error.response?.data || error.message);
        throw new Error(error.response?.data || 'Failed to delete car');
    }
};

