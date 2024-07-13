"use client";

import { Button } from "@/components/ui/button";
import VolunteerInput from "@/components/ui/volunteer/volunteerInput";
import { api } from "@/trpc/react";
import { Car, Sailboat, Tractor, Truck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const vehicleTypes = {
  Carro: Car,
  Caminhao: Truck,
  Trator: Tractor,
  Barco: Sailboat,
  Drone: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFF"
      height="32px"
      width="32px"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512.006 512.006"
    >
      <g>
        <g>
          <g>
            <path d="M256,448.003c11.776,0,21.333-9.557,21.333-21.333s-9.557-21.333-21.333-21.333s-21.333,9.557-21.333,21.333     S244.224,448.003,256,448.003z" />
            <path d="M469.333,85.467V42.67h21.333c11.782,0,21.333-9.551,21.333-21.333c0-11.782-9.551-21.333-21.333-21.333h-85.333     C393.551,0.003,384,9.554,384,21.337c0,11.782,9.551,21.333,21.333,21.333h21.333v42.797c-23.84,1.691-42.66,21.565-42.66,45.843     v27.982l-20.934,14.045v-24c0-11.782-9.551-21.333-21.333-21.333H171.072c-11.782,0-21.333,9.551-21.333,21.333v24.275     l-21.732-14.397V131.31c0-24.282-18.823-44.149-42.673-45.843V42.67h21.333c11.782,0,21.333-9.551,21.333-21.333     c0-11.782-9.551-21.333-21.333-21.333H21.333C9.551,0.003,0,9.554,0,21.337C0,33.119,9.551,42.67,21.333,42.67h21.333v42.797     c-23.84,1.691-42.66,21.565-42.66,45.843v142.72c0,25.387,20.574,45.973,45.952,45.973h36.075     c25.393,0,45.973-20.581,45.973-45.973v-63.636l21.732,14.397v52.533c-16.655,13.822-28.374,33.769-35.405,58.089     c-6.739,23.313-8.442,47.163-7.437,67.724c0.091,1.854,0.187,3.232,0.262,4.081c1.039,11.736,11.395,20.408,23.131,19.37     c11.736-1.039,20.408-11.395,19.37-23.131c-0.027-0.304-0.084-1.124-0.147-2.403c-0.795-16.267,0.596-35.758,5.809-53.792     c9.157-31.677,26.82-48.591,58.42-48.591h21.232l-0.203,42.667H192c-11.782,0-21.333,9.551-21.333,21.333v128     c0,11.782,9.551,21.333,21.333,21.333h128c11.782,0,21.333-9.551,21.333-21.333v-128c0-11.782-9.551-21.333-21.333-21.333     h-42.561l0.203-42.667h21.434c31.6,0,49.263,16.915,58.42,48.591c5.213,18.034,6.605,37.524,5.809,53.792     c-0.063,1.279-0.12,2.099-0.147,2.403c-1.039,11.736,7.633,22.092,19.37,23.131c11.736,1.039,22.092-7.633,23.131-19.37     c0.075-0.849,0.171-2.227,0.262-4.081c1.005-20.561-0.697-44.411-7.437-67.724c-7.031-24.323-18.753-44.273-35.413-58.095v-52.6     l20.934-14.045v63.359c0,25.387,20.574,45.973,45.952,45.973h36.075c25.393,0,45.973-20.581,45.973-45.973V131.31     C512.006,107.028,493.184,87.161,469.333,85.467z M82.033,277.337H45.958c-1.808,0-3.285-1.479-3.285-3.307V131.31     c0-1.828,1.478-3.307,3.285-3.307h36.075c1.829,0,3.307,1.478,3.307,3.307v39.444c0,0.051-0.001,0.102,0,0.152V274.03     C85.34,275.858,83.862,277.337,82.033,277.337z M298.667,469.337h-85.333v-85.333h85.333V469.337z M192.405,256.003v-42.696     c0-0.082,0.001-0.163,0-0.244V170.67h128v85.333H192.405z M469.34,274.03c0,1.829-1.478,3.307-3.307,3.307h-36.075     c-1.808,0-3.285-1.479-3.285-3.307V131.31c0-1.828,1.478-3.307,3.285-3.307h36.075c1.829,0,3.307,1.478,3.307,3.307V274.03z" />
          </g>
        </g>
      </g>
    </svg>
  ),
  Helicoptero: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFF"
      version="1.1"
      id="Capa_1"
      width="32px"
      height="32px"
      viewBox="0 0 586.5 586.5"
    >
      <g>
        <g id="Layer_1_45_">
          <path d="M569.926,109.013H122.4c-8.925,0-15.3,6.375-15.3,15.3s6.375,15.3,15.3,15.3h207.825v40.8    c-61.2,5.1-110.924,33.15-130.049,72.675l-81.6,7.65c-10.2-20.4-31.875-35.7-56.1-35.7C28.05,225.038,0,253.087,0,287.513    c0,34.425,28.05,62.475,62.475,62.475c24.225,0,45.9-14.024,56.1-35.7l81.6,7.65c16.575,33.15,54.825,58.65,102,68.85l42.074,45.9    H214.2c-11.475,0-20.4,8.925-20.4,20.4c0,11.475,8.925,20.399,20.4,20.399h243.524c42.076,0,76.5-34.425,76.5-76.5    c0-11.475-8.924-20.399-20.4-20.399c-11.475,0-20.398,8.925-20.398,20.399c0,19.125-16.576,35.7-35.701,35.7H387.6l-38.25-40.8    c85.426,0,154.275-48.45,154.275-108.375c0-56.1-62.475-103.275-141.525-107.1v-40.8h209.1c8.926,0,15.301-6.375,15.301-15.3    S578.85,109.013,569.926,109.013z M63.75,319.388c-17.85,0-31.875-14.025-31.875-31.875c0-17.85,14.025-31.875,31.875-31.875    c7.65,0,15.3,2.55,21.675,8.925h-7.65c-11.475,1.275-20.4,11.475-20.4,22.95c0,11.475,8.925,21.675,20.4,22.95l7.65,1.274    C79.05,315.562,71.4,319.388,63.75,319.388z M478.125,283.688c0,2.55,0,5.1-1.275,6.375c-1.275,1.275-3.824,2.55-6.375,2.55h-102    c-12.75,0-22.949-10.2-22.949-22.95v-61.2c0-2.55,1.275-3.825,2.549-6.375c1.275-1.275,3.826-2.55,6.375-2.55    C419.475,203.362,471.75,239.062,478.125,283.688z" />
        </g>
      </g>
    </svg>
  ),
};

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
        {Object.entries(vehicleTypes).map(([type, Icon]) => (
          <Button
            type="button"
            key={type}
            variant={vehicleData.vehicleType === type ? "default" : "outline"}
            className="flex min-h-32 min-w-32 flex-col items-center gap-2 p-4"
            onClick={() => handleVehicleTypeSelect(type)}
          >
            {typeof Icon === "string" ? (
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
