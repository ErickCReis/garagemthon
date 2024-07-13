import { api } from "@/trpc/server";
import { Pedido } from "../_components/pedido";

export default async function Page() {
  const pedidos = await api.pedido.getAll();

  return (
    <>
      <h1>Pedidos</h1>
      <div className="">
        {pedidos.map((pedido) => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </>
  );
}
