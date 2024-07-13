import { Pedido } from "@/app/_components/pedido";
import { Button } from "@/components/ui/button";
import { ongs } from "@/data";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const ong = ongs.find((ong) => ong.id === params.id);

  if (!ong) {
    return <div>ONG não encontrada</div>;
  }

  const pedidos = await api.pedido.getAllByDono(ong.id);

  return (
    <>
      <div className="flex justify-between">
        <h1>{ong.nome}</h1>
        <Link href={`/ongs/${ong.id}/criar-pedido`}>
          <Button>Criar Pedido</Button>
        </Link>
      </div>
      {pedidos.map((pedido) => (
        <Pedido key={pedido.id} pedido={pedido} />
      ))}
    </>
  );
}
