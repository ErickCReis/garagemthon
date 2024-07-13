"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { useState } from "react";

export function VincularVoluntario({ pedidoId }: { pedidoId: string }) {
  const [email, setEmail] = useState("");

  const vincularVoluntario = api.pedido.vincularVoluntario.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    vincularVoluntario.mutate({
      pedido: +pedidoId,
      email,
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <Label>Email</Label>
          <Input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit">Incluir Voluntário</Button>
      </form>
    </>
  );
}
