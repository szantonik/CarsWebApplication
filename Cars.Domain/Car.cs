﻿namespace Cars.Domain
{
    public enum FuelType { Petrol=1, Hybrid=2, Diesel=3, LPG=4 }
    public enum BodyType { Hatchback=1, Sedan=2, Kombi=3, SUV=4, Roadster=5, Coupe=6 }

    public class Car
    {
        public Guid Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int DoorsNumber { get; set; }
        public int LuggageCapacity { get; set; }
        public int EngineCapacity { get; set; }
        public FuelType FuelType { get; set; }
        public DateTime ProductionDate { get; set; }
        public double CarFuelConsumption { get; set; }
        public BodyType BodyType { get; set; }
    }
}
