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
    <main className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{ong.nome}</h1>
        <Link href={`/ongs/${ong.id}/criar-pedido`}>
          <Button>Criar Pedido</Button>
        </Link>
      </div>
      <p>Pedidos cadastrados</p>
      <div className="flex flex-col gap-4">
        {pedidos.map((pedido) => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </main>
  );
}
