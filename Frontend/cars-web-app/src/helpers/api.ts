import axios from "axios";

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