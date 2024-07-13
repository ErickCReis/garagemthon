import { CriarPedidoForm } from "../../_components/criar-pedido";

export default function Page() {
  return (
    <main className="space-y-10">
      <h1 className="text-2xl font-bold">Novo Pedido</h1>
      <CriarPedidoForm />
    </main>
  );
}
