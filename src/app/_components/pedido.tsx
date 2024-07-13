import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { type RouterOutputs } from "@/trpc/react";
import Link from "next/link";

type Pedido = RouterOutputs["pedido"]["getAll"][number];

export function Pedido({ pedido }: { pedido: Pedido }) {
  return (
    <Link href={`/pedidos/${pedido.id}`}>
      <Card className="cursor-pointer">
        <CardHeader>
          <h2>ONG ABC</h2>
        </CardHeader>
        <CardContent>
          <p>{pedido.pontoColeta}</p>
          <p>{pedido.pontoEntrega}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
