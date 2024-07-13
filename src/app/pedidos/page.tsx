import { api } from "@/trpc/server";
import { Pedido } from "../_components/pedido";

export default async function Page() {
  const pedidos = await api.pedido.getAll();

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">Todos os Pedidos</h1>
      <p>
        Lista de todos os pedidos cadastrados por ONGs e que precisam ser
        atendidos
      </p>
      <div className="flex flex-col gap-4">
        {pedidos.map((pedido) => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </main>
  );
}
