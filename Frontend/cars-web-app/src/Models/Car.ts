// export enum FuelType{
//     Petrol = 0,
//     Hybrid = 1,
//     Diesel = 2,
//     LPG = 3,
//     Electric = 4
// }

// export enum BodyType{
//     Hatchback = 0,
//     Sedan = 1,
//     Kombi = 2,
//     SUV = 3,
//     Roadster = 4,
//     Coupe = 5
// }

// export interface Car{
//     id: string,
//     brand: string,
//     model: string,
//     doorsNumber: number,
//     luggageCapacity: number,
//     engineCapacity: number,
//     productionDate: string,
//     fuelType: FuelType,
//     carFuelConsumption: number,
//     bodyType: BodyType
// }

export enum FuelType {
    Petrol = 'Petrol',
    Hybrid = 'Hybrid',
    Diesel = 'Diesel',
    LPG = 'LPG',
    Electric = 'Electric',
  }
  
  export enum BodyType {
    Hatchback = 'Hatchback',
    Sedan = 'Sedan',
    Kombi = 'Kombi',
    SUV = 'SUV',
    Roadster = 'Roadster',
    Coupe = 'Coupe',
  }
  
  export interface Car {
    id: string;
    brand: string;
    model: string;
    doorsNumber: number;
    luggageCapacity: number;
    engineCapacity: number;
    fuelType: FuelType;
    productionDate: string;
    carFuelConsumption: number;
    bodyType: BodyType;
  }
  