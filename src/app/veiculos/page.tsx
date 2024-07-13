"use client";

import { MeioTransportIcon } from "@/app/_components/meio-transport-icon";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function VehiclesPage() {
  const { data: vehicles, isLoading } = api.veiculos.getAll.useQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="space-y-4">
      <h2 className="text-2xl font-bold">Veículos</h2>
      <p>Veículos disponíveis para transporte</p>
      <div className="flex flex-col space-y-2">
        {vehicles?.map(({ vehicle, owner }) => (
          <div
            key={vehicle.id}
            className="flex items-center gap-4 rounded-md border p-4"
          >
            <MeioTransportIcon
              meio={vehicle.type as any}
              className="h-16 w-16"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{vehicle.type}</h3>
              <p>{vehicle.description}</p>
              <p>
                <strong>ID:</strong> {vehicle.vehicleId}
              </p>
              <p>
                <strong>Modelo:</strong> {vehicle.model}
              </p>
              <p>
                <strong>Cor:</strong> {vehicle.color}
              </p>
              {owner && (
                <>
                  <p>
                    <strong>Proprietário:</strong> {owner.nome}
                  </p>
                  <p>
                    <strong>Email:</strong> {owner.email}
                  </p>
                </>
              )}
            </div>
            <Link href={`/voluntarios/${vehicle.id}`} className="self-end">
              <Button className="gap-2">
                Ver Perfil <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
