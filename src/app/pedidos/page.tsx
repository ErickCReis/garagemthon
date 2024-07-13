import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import Link from "next/link";
import { Pedido } from "../_components/pedido";

export default async function Page() {
  const pedidos = await api.pedido.getAll();

  return (
    <>
      <div className="flex justify-between">
        <h1>Pedidos</h1>
        <Link href="/pedidos/criar">
          <Button>Criar Pedido</Button>
        </Link>
      </div>
      <div className="">
        {pedidos.map((pedido) => (
          <Pedido key={pedido.id} pedido={pedido} />
        ))}
      </div>
    </>
  );
}
