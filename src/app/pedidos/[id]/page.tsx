import { Pedido } from "@/app/_components/pedido";
import { VincularVoluntario } from "@/app/_components/vincular-voluntario";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ongs } from "@/data";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const pedido = await api.pedido.getById(+params.id);

  if (!pedido) {
    return <div>Pedido não encontrado</div>;
  }

  const ong = ongs.find((ong) => ong.id === pedido.donoId);

  if (!ong) {
    return <div>ONG não encontrada</div>;
  }

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-lg font-bold">Pedido #{pedido.id}</h1>

      <Pedido pedido={pedido} />

      <h2 className="text-lg font-bold">Voluntários</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pedido.voluntarios.map((voluntario) => (
          <Card key={voluntario.id} className="rounded-lg border p-4 shadow-md">
            <div className="mb-4 flex items-center space-x-4">
              <div className="rounded-full bg-gray-200 p-4">
                <span className="text-6xl">👩🏻‍💻</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{voluntario.nome}</h2>
                <p className="text-gray-600">{voluntario.email}</p>
                <p className="text-gray-600">{voluntario.cpf}</p>
              </div>
            </div>
            <Link href={`/voluntarios/${voluntario.id}`}>
              <Button className="w-full">Ver Perfil</Button>
            </Link>
          </Card>
        ))}
      </div>

      <VincularVoluntario pedidoId={params.id} />
    </main>
  );
}
