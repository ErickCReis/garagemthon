"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import VolunteerInput from '@/components/ui/volunteer/volunteerInput';
import VolunteerTextarea from '@/components/ui/volunteer/volunteerTextarea';
import VolunteerButton from '@/components/ui/volunteer/volunteerButton';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Vehicle {
  id: number;
  type: string;
  description: string;
  vehicleId: string;
  model: string;
  color: string;
}

const fetchVehicles = async (volunteerId: number): Promise<Vehicle[]> => {
  const response = await fetch(`/api/volunteers/${volunteerId}/vehicles`);
  if (!response.ok) {
    throw new Error('Failed to fetch vehicles');
  }
  return response.json();
};

const ProfilePage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the dynamic id from the URL

  const volunteerId = Number(id); // Convert id to number
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleData, setVehicleData] = useState({
    vehicleType: '',
    vehicleDescription: '',
    vehicleId: '',
    vehicleModel: '',
    vehicleColor: '',
  });

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const fetchedVehicles = await fetchVehicles(volunteerId);
        setVehicles(fetchedVehicles);
      } catch (error) {
        console.error(error);
      }
    };

    getVehicles();
  }, [volunteerId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData),
      });
      if (!response.ok) {
        throw new Error('Failed to add vehicle');
      }
      router.refresh(); // Refresh the data after mutation
      setVehicleData({
        vehicleType: '',
        vehicleDescription: '',
        vehicleId: '',
        vehicleModel: '',
        vehicleColor: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-8">
        <Image
          src="/profile-picture.png" // Replace with actual profile picture path
          alt="Profile Picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">Nome do Voluntário</h1> {/* Replace with actual volunteer name */}
          <p className="text-gray-600">Informações do perfil</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Adicionar Veículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <VolunteerInput
          label="Tipo de Veículo"
          id="vehicleType"
          name="vehicleType"
          value={vehicleData.vehicleType}
          onChange={handleChange}
          required
        />
        <VolunteerTextarea
          label="Descrição do Veículo"
          id="vehicleDescription"
          name="vehicleDescription"
          value={vehicleData.vehicleDescription}
          onChange={handleChange}
          required
        />
        <VolunteerInput
          label="ID do Veículo"
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
        <VolunteerButton type="submit">Adicionar Veículo</VolunteerButton>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Lista de Veículos</h2>
      <ul className="space-y-4">
        {vehicles.map((vehicle: Vehicle) => (
          <li key={vehicle.id} className="p-4 border rounded-lg shadow-md bg-white">
            <div className="grid grid-cols-2 gap-4">
              <p>
                <strong>Tipo:</strong> {vehicle.type}
              </p>
              <p>
                <strong>Descrição:</strong> {vehicle.description}
              </p>
              <p>
                <strong>ID:</strong> {vehicle.vehicleId}
              </p>
              <p>
                <strong>Modelo:</strong> {vehicle.model}
              </p>
              <p>
                <strong>Cor:</strong> {vehicle.color}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Button type="button" onClick={() => router.push('/volunteers/register')} className="mt-8">
        Voltar para Registro
      </Button>
    </div>
  );
};

export default ProfilePage;
