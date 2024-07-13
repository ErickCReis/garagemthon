"use client";

import { MeioTransportIcon } from "@/app/_components/meio-transport-icon";
import { Button } from "@/components/ui/button";
import VolunteerInput from "@/components/ui/volunteer/volunteerInput";
import { meiosTransporte } from "@/data";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [vehicleData, setVehicleData] = useState({
    vehicleType: "",
    vehicleDescription: "",
    vehicleId: "",
    vehicleModel: "",
    vehicleColor: "",
  });

  const criarVehiculo = api.veiculos.create.useMutation({
    onSuccess: () => {
      router.push(`/voluntarios/${params.id}`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    criarVehiculo.mutate({
      ...vehicleData,
      imgUrl: "",
      voluntarioId: +params.id,
    });
  };

  const handleVehicleTypeSelect = (type: string) => {
    setVehicleData((prevData) => ({
      ...prevData,
      vehicleType: type,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Cadastrar veículo</h1>
      <div className="mb-4 flex flex-wrap gap-2">
        {meiosTransporte.map((meio) => {
          return (
            <Button
              type="button"
              key={meio}
              variant={vehicleData.vehicleType === meio ? "default" : "outline"}
              className="flex min-h-32 min-w-32 flex-col items-center gap-2 p-4"
              onClick={() => handleVehicleTypeSelect(meio)}
            >
              <MeioTransportIcon meio={meio} />
            </Button>
          );
        })}
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
        <VolunteerInput
          label="Descrição do veículo"
          id="vehicleDescription"
          name="vehicleDescription"
          value={vehicleData.vehicleDescription}
          onChange={handleChange}
          required
        />
        <Button type="submit">Adicionar veículo</Button>
      </form>
    </div>
  );
}
