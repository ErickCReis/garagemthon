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
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { meiosTransporte, type MeioTransporte, type TipoItem } from "@/data";
import {
  criarPedidoFormSchema,
  type CriarPedidoFormValues,
} from "@/lib/validators";
import { api } from "@/trpc/react";
import { Label } from "@radix-ui/react-label";
import { Car, CheckIcon, Plane, Sailboat, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const pontosColeta = [
  { label: "Ponto de Coleta 1", value: "coleta1" },
  { label: "Ponto de Coleta 2", value: "coleta2" },
  { label: "Ponto de Coleta 3", value: "coleta3" },
] as const;

const pontosEntrega = [
  { label: "Ponto de Entrega 1", value: "entrega1" },
  { label: "Ponto de Entrega 2", value: "entrega2" },
  { label: "Ponto de Entrega 3", value: "entrega3" },
] as const;

const tiposItemMap = {
  g: "Grande (50 kg)",
  m: "Médio (25 kg)",
  p: "Pequeno (10 kg)",
} satisfies Record<TipoItem, string>;

const meiosTransporteMap = {
  Carro: Car,
  Caminhao: Truck,
  Barco: Sailboat,
  Avião: Plane,
} satisfies Record<MeioTransporte, React.FC>;

const defaultValues: Partial<CriarPedidoFormValues> = {
  pontoColeta: "coleta1",
  pontoEntrega: "entrega1",
  items: { g: 0, m: 0, p: 0 },
  meiosTransporte: {
    Carro: false,
    Caminhao: false,
    Barco: false,
    Avião: false,
  },
};

export function CriarPedidoSteps() {
  const [quantidadeItems, setQuantidadeItems] = useState<number>(1);
  const [tipoItem, setTipoItem] = useState<TipoItem | undefined>();

  const form = useForm<CriarPedidoFormValues>({
    resolver: zodResolver(criarPedidoFormSchema),
    defaultValues,
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
    criarPedido.mutate(data);
  }

  return (
    <main>
      <h1 className="text-2xl font-bold">Criar Pedido</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <h2 className="border-b text-lg font-medium">Endereços</h2>

          <FormField
            control={form.control}
            name="pontoColeta"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ponto de coleta</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? pontosColeta.find((pc) => pc.value === field.value)
                              ?.label
                          : "Selecione um ponto de coleta."}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar ..." className="h-9" />
                      <CommandEmpty>Nenhum ponto encontrado.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {pontosColeta.map((pc) => (
                            <CommandItem
                              value={pc.label}
                              key={pc.value}
                              onSelect={() => {
                                form.setValue("pontoColeta", pc.value);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  pc.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {pc.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? pontosEntrega.find((pe) => pe.value === field.value)
                              ?.label
                          : "Selecione um ponto de entrega."}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                      <CommandInput placeholder="Buscar ..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {pontosEntrega.map((pe) => (
                            <CommandItem
                              value={pe.label}
                              key={pe.value}
                              onSelect={() => {
                                form.setValue("pontoEntrega", pe.value);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  pe.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {pe.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
              const Icon = meiosTransporteMap[meio];

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
                  <Icon className="size-16" />
                  <p>{meio}</p>
                </Button>
              );
            })}
          </div>

          <Button type="submit">Criar</Button>
        </form>
      </Form>
    </main>
  );
}
