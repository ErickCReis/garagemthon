"use client";

import React, { useState } from "react";
import VolunteerInput from "@/components/ui/volunteer/volunteerInput";
import VolunteerTextarea from "@/components/ui/volunteer/volunteerTextarea";
import VolunteerButton from "@/components/ui/volunteer/volunteerButton";

const AddVehicle = () => {
  const [vehicleData, setVehicleData] = useState({
    vehicleType: "",
    vehicleDescription: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Vehicle Data Submitted: ", vehicleData);
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Vehicle Information</h1>
      <form onSubmit={handleSubmit}>
        <VolunteerInput
          label="Tipo de veículo"
          id="vehicleType"
          name="vehicleType"
          value={vehicleData.vehicleType}
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
