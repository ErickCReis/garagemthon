import { CriarPedidoForm } from "@/app/_components/criar-pedido";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <main className="space-y-10">
      <h1 className="text-2xl font-bold">Novo Pedido</h1>
      <CriarPedidoForm donoId={params.id} />
    </main>
  );
}
