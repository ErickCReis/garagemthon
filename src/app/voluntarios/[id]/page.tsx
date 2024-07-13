import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";
import Link from "next/link";

const emojis = ["👩🏻‍💻", "👨🏻‍💻", "👩🏻‍🔬", "👨🏻‍🔬", "👩🏻‍🏫", "👨🏻‍🏫"];

export default async function Page({ params }: { params: { id: string } }) {
  const voluntario = await api.voluntarios.getById(+params.id);
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-8">
        <div className="rounded-full bg-gray-200 p-4">
          <span className="text-6xl">{randomEmoji}</span>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{voluntario?.voluntario.nome}</h1>
          <p className="text-gray-600">{voluntario?.voluntario.email}</p>
          <p className="text-gray-600">{voluntario?.voluntario.cpf}</p>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Lista de Veículos</h2>
      <Link href={`/voluntarios/${params.id}/adicionar-veiculo`}>
        <Button>Adicionar Veículo</Button>
      </Link>

      <ul className="space-y-4 mt-4">
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
    </div>
  );
}
