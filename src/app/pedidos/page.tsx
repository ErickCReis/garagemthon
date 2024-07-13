import { api } from "@/trpc/server";
import { Pedido } from "../_components/pedido";

export default async function Page() {
  const pedidos = await api.pedido.getAll();

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Todos os Pedidos</h1>
      </div>
      <div className="">
        {pedidos.map((pedido) => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </>
  );
}
