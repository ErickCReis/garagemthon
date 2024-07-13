import { MeioTransportIcon } from "@/app/_components/meio-transport-icon";
import { VincularVoluntario } from "@/app/_components/vincular-voluntario";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ongs } from "@/data";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const pedido = await api.pedido.getById(+params.id);
  const ong = ongs.find((ong) => ong.id === pedido.donoId);

  if (!ong) {
    return <div>ONG não encontrada</div>;
  }

  return (
    <>
      <h1 className="text-lg font-bold">Pedido - {ong.nome}</h1>

      <div className="">
        <p>Coleta: {pedido.pontoColeta}</p>
        <p>Entrega: {pedido.pontoEntrega}</p>
        <div className="w-6 p-2">
          {(pedido.meiosTransportes ?? []).map((meio) => (
            <MeioTransportIcon
              key={meio}
              // @ts-expect-error: TODO: remover isso
              meio={meio}
              className="size-4"
              showLabel={false}
            />
          ))}
        </div>
      </div>
      <h2 className="text-lg font-bold">Voluntários</h2>
      <div className="space-y-4">
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
    </>
  );
}
