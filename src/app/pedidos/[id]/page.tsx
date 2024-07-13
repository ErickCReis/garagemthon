import { api } from "@/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const pedido = await api.pedido.getById(+params.id);

  return (
    <>
      <h1>Pedido</h1>
      <div className="">
        <pre>{JSON.stringify(pedido, null, 2)}</pre>
      </div>
    </>
  );
}
