import { VincularVoluntario } from "@/app/_components/vincular-voluntario";
import { ongs } from "@/data";
import { api } from "@/trpc/server";

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
        <pre>{JSON.stringify(pedido, null, 2)}</pre>
      </div>
      <h2 className="text-lg font-bold">Voluntários</h2>
      <div className="">
        {pedido.voluntarios.map((voluntario) => (
          <div key={voluntario.id}>
            <pre>{JSON.stringify(voluntario, null, 2)}</pre>
          </div>
        ))}
      </div>

      <VincularVoluntario pedidoId={params.id} />
    </>
  );
}
