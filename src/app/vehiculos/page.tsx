"use client";

import React from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MeioTransportIcon } from "@/app/_components/meio-transport-icon";

export default function VehiclesPage() {
  const { data: vehicles, isLoading } = api.veiculos.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col p-4">
      <section className="space-y-4">
        <h2 className="text-center text-2xl font-bold">Veículos</h2>
        <h3 className="text-center text-2xl">Veículos disponíveis para transporte</h3>
        <div className="flex flex-col space-y-2">
          {vehicles?.map(({ vehicle, owner }) => (
            <div key={vehicle.id} className="flex items-center gap-4 p-4 border rounded-md">
              <MeioTransportIcon meio={vehicle.type as any} className="w-16 h-16" />
              <div>
                <h3 className="text-xl font-semibold">{vehicle.type}</h3>
                <p>{vehicle.description}</p>
                <p><strong>ID:</strong> {vehicle.vehicleId}</p>
                <p><strong>Modelo:</strong> {vehicle.model}</p>
                <p><strong>Cor:</strong> {vehicle.color}</p>
                {owner && (
                  <>
                    <p><strong>Proprietário:</strong> {owner.nome}</p>
                    <p><strong>Email:</strong> {owner.email}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Link href="/">
        <Button className="mt-4">Voltar para Registro</Button>
      </Link>
    </main>
  );
}
