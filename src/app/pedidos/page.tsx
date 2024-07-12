import { CriarPedido } from "../_components/criar-pedido";

const pedidos = [
  {
    id: 1,
    pontoColeta: "TP Cruz Vermelha",
    pontoEntrega: "ONG ABC",
  },
];

export default function Page() {
  return (
    <>
      <h1>Pedidos</h1>
      <CriarPedido />
    </>
  );
}
