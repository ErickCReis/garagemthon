"use client";

import React, { useState } from "react";
import { Car, Truck, Tractor, Sailboat } from "lucide-react";
import Image from 'next/image';
import VolunteerInput from "@/components/ui/volunteer/volunteerInput";
import VolunteerTextarea from "@/components/ui/volunteer/volunteerTextarea";
import VolunteerButton from "@/components/ui/volunteer/volunteerButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Make sure you have this utility
import { api } from "@/trpc/react";

const vehicleTypes = {
  Carro: Car,
  Caminhao: Truck,
  Trator: Tractor,
  Barco: Sailboat,
  Drone: 'https://raw.githubusercontent.com/Grupo-14-8BIT/Img/3bc72fd1e4038a8b518ec6a1d7cd022b88930fbc/Profile/drone-svgrepo-com.svg',
  Helicoptero: 'https://raw.githubusercontent.com/Grupo-14-8BIT/Img/3bc72fd1e4038a8b518ec6a1d7cd022b88930fbc/Profile/helicopter-svgrepo-com.svg',
};

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicleType: "",
    vehicleDescription: "",
    vehicleId: "",
    vehicleModel: "",
    vehicleColor: "",
  });
  
  const criarVehiculo = api.volunteers.create.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    criarVehiculo.mutate(vehicleData)
  };

  const handleVehicleTypeSelect = (type: string) => {
    setVehicleData((prevData) => ({
      ...prevData,
      vehicleType: type,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastrar veículo</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(vehicleTypes).map(([type, Icon]) => (
          <Button
            type="button"
            key={type}
            variant={vehicleData.vehicleType === type ? "default" : "outline"}
            className="flex min-h-32 min-w-32 flex-col items-center gap-2 p-4"
            onClick={() => handleVehicleTypeSelect(type)}
          >
            {typeof Icon === 'string' ? (
              <Image src={Icon} alt={type} width={32} height={32} />
            ) : (
              <Icon className="h-8 w-8" />
            )}
            <p>{type}</p>
          </Button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <VolunteerInput
          label="Vehicle ID"
          id="vehicleId"
          name="vehicleId"
          value={vehicleData.vehicleId}
          onChange={handleChange}
          required
        />
        <VolunteerInput
          label="Modelo"
          id="vehicleModel"
          name="vehicleModel"
          value={vehicleData.vehicleModel}
          onChange={handleChange}
          required
        />
        <VolunteerInput
          label="Cor"
          id="vehicleColor"
          name="vehicleColor"
          value={vehicleData.vehicleColor}
          onChange={handleChange}
          required
        />
        <VolunteerTextarea
          label="Descrição do veículo"
          id="vehicleDescription"
          name="vehicleDescription"
          value={vehicleData.vehicleDescription}
          onChange={handleChange}
          required
        />
        <VolunteerButton type="submit">Add Vehicle</VolunteerButton>
      </form>
    </div>
  );
};

export default AddVehicle;
