"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { meiosTransporte, type TipoItem } from "@/data";
import {
  criarPedidoFormSchema,
  type CriarPedidoFormValues,
} from "@/lib/validators";
import { api } from "@/trpc/react";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MeioTransportIcon } from "./meio-transport-icon";

const tiposItemMap = {
  g: "Grande (50 kg)",
  m: "Médio (25 kg)",
  p: "Pequeno (10 kg)",
} satisfies Record<TipoItem, string>;

const defaultValues: Partial<CriarPedidoFormValues> = {
  items: { g: 0, m: 0, p: 0 },
  meiosTransporte: {
    Carro: false,
    Caminhao: false,
    Barco: false,
    Drone: false,
    Helicoptero: false,
  },
};

export function CriarPedidoForm({ donoId }: { donoId: string }) {
  const [quantidadeItems, setQuantidadeItems] = useState<number>(1);
  const [tipoItem, setTipoItem] = useState<TipoItem | undefined>();

  const form = useForm<CriarPedidoFormValues>({
    resolver: zodResolver(criarPedidoFormSchema),
    defaultValues: {
      ...defaultValues,
      donoId,
    },
  });

  const router = useRouter();
  const criarPedido = api.pedido.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Pedido criado com sucesso!",
      });

      void router.push("/pedidos");
    },
  });

  const itemsForm = form.watch("items") ?? defaultValues.items;
  const meiosTransporteForm =
    form.watch("meiosTransporte") ?? defaultValues.meiosTransporte;

  function onSubmit(data: CriarPedidoFormValues) {
    console.log({ data });

    criarPedido.mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h2 className="border-b text-lg font-medium">Endereços</h2>

        <FormField
          control={form.control}
          name="pontoColeta"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ponto de coleta</FormLabel>
              <FormControl>
                <Input
                  placeholder="Endereço de coleta"
                  value={field.value}
                  onChange={(e) => {
                    form.setValue("pontoColeta", e.target.value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pontoEntrega"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ponto de Entrega</FormLabel>
              <FormControl>
                <Input
                  placeholder="Endereço de entrega"
                  value={field.value}
                  onChange={(e) => {
                    form.setValue("pontoEntrega", e.target.value);
                  }}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <h2 className="border-b text-lg font-medium">Itens</h2>

        {Object.entries(itemsForm).map(([tipo, quantidade], index) => {
          if (quantidade === 0) return null;

          return (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex gap-2">
                {quantidade}x - {tiposItemMap[tipo as TipoItem]}
              </div>
            </div>
          );
        })}

        <div className="flex items-end gap-2">
          <div className="flex flex-col gap-2">
            <Label>Quantidade</Label>
            <Input
              type="number"
              placeholder="0"
              value={quantidadeItems}
              onChange={(e) => {
                setQuantidadeItems(Number(e.target.value));
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Tipo</Label>
            <Select
              onValueChange={(value) => {
                setTipoItem(value as TipoItem);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="g">Grande</SelectItem>
                <SelectItem value="m">Médio</SelectItem>
                <SelectItem value="p">Pequeno</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="button"
            onPointerDown={() => {
              if (!quantidadeItems || !tipoItem) {
                return;
              }

              const key = `items.${tipoItem}` as const;
              const prevItems = form.getValues(key) ?? 0;

              form.setValue(`items.${tipoItem}`, prevItems + quantidadeItems);

              setQuantidadeItems(1);
            }}
          >
            Adicionar
          </Button>
        </div>

        <h2 className="border-b text-lg font-medium">Meios de Transporte</h2>

        <div className="flex flex-wrap gap-2">
          {meiosTransporte.map((meio) => {
            return (
              <Button
                type="button"
                variant={meiosTransporteForm[meio] ? "default" : "outline"}
                key={meio}
                className="flex min-h-32 min-w-32 flex-col items-center gap-2 p-4"
                onPointerDown={() => {
                  form.setValue(
                    `meiosTransporte.${meio}`,
                    !meiosTransporteForm[meio],
                  );
                }}
              >
                <MeioTransportIcon meio={meio} />
              </Button>
            );
          })}
        </div>

        <Button type="submit">Criar</Button>
      </form>
    </Form>
  );
}
