import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const voluntario = await api.voluntarios.getById(+params.id);

  return (
    <>
      <h1>Voluntario</h1>
      <h2 className="mb-4 mt-8 text-2xl font-semibold">Lista de Veículos</h2>
      <Link href={`/voluntarios/${params.id}/adicionar-veiculo`}>
        <Button>Adicionar Veículo</Button>
      </Link>

      <ul className="space-y-4">
        {voluntario?.veiculos.map((vehicle) => (
          <Card key={vehicle.id} className="rounded-lg border p-4 shadow-md">
            <li>
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
          </Card>
        ))}
      </ul>
    </>
  );
}
