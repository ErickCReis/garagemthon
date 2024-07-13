"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import { useState } from "react";

export function VincularVoluntario({ pedidoId }: { pedidoId: string }) {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const vincularVoluntario = api.pedido.vincularVoluntario.useMutation({
    onSuccess: () => {
      toast({
        title: "Voluntário vinculado com sucesso",
      });

      setOpen(false);
    },
  });

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Adicionar Voluntário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Adicionar Voluntário</DialogTitle>
        <DialogDescription>
          Adicione um novo voluntário a este pedido.
        </DialogDescription>

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
          <Button type="submit">Adicionar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
