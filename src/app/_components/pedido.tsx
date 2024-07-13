import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ongs } from "@/data";
import { type RouterOutputs } from "@/trpc/react";
import Link from "next/link";
import { MeioTransportIcon } from "./meio-transport-icon";

type Pedido = RouterOutputs["pedido"]["getAll"][number];

export function Pedido({ pedido }: { pedido: Pedido }) {
  const ong = ongs.find((ong) => ong.id === pedido.donoId);

  return (
    <Link href={`/pedidos/${pedido.id}`}>
      <Card className="cursor-pointer">
        <CardHeader>
          <h2>{ong?.nome}</h2>
        </CardHeader>
        <CardContent className="">
          <p>Coleta: {pedido.pontoColeta}</p>
          <p>Entrega: {pedido.pontoEntrega}</p>
          <div className="w-6 p-2">
            {pedido.meiosTransportes.map((meio) => (
              // @ts-expect-error: TODO: remover isso
              <MeioTransportIcon
                key={meio}
                meio={meio}
                className="size-4"
                showLabel={false}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
