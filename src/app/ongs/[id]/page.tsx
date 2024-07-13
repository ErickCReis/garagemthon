import { ongs } from "@/data";
import { api } from "@/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const ong = ongs.find((ong) => ong.id === params.id);

  if (!ong) {
    return <div>ONG não encontrada</div>;
  }

  const pedidos = await api.pedido.getAllByDono(ong.id);

  return (
    <>
      <h1>{ong.nome}</h1>
      <div className="">
        <pre>{JSON.stringify(pedidos, null, 2)}</pre>
      </div>
    </>
  );
}
