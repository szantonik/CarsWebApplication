export enum FuelType{
    Petrol = 1,
    Hybrid = 2,
    Diesel = 3,
    LPG = 4,
}

export enum BodyType{
    Hatchback = 1,
    Sedan = 2,
    Kombi = 3,
    SUV = 4,
    Roadster = 5,
    Coupe = 6
}

export interface Car{
    id: string,
    brand: string,
    model: string,
    doorsNumber: number,
    luggageCapacity: number,
    engineCapacity: number,
    productionDate: string,
    fuelType: FuelType,
    carFuelConsumption: number,
    bodyType: BodyType
}
