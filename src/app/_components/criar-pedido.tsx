"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";

const pontosColeta = [
  { label: "Ponto de Coleta 1", value: "ponto1" },
  { label: "Ponto de Coleta 2", value: "ponto2" },
  { label: "Ponto de Coleta 3", value: "ponto3" },
] as const;

const criarPedidoFormSchema = z.object({
  pontoColeta: z.string({
    required_error: "Selecione um ponto de coleta.",
  }),
  pontoEntrega: z.string({
    required_error: "Selecione um ponto de entrega.",
  }),
});

type CriarPedidoFormValues = z.infer<typeof criarPedidoFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<CriarPedidoFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function CriarPedido() {
  const form = useForm<CriarPedidoFormValues>({
    resolver: zodResolver(criarPedidoFormSchema),
    defaultValues,
  });
  function onSubmit(data: CriarPedidoFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog>
      <DialogTrigger>Criar pedido</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            ? pontosColeta.find(
                                (pc) => pc.value === field.value,
                              )?.label
                            : "Selecione um ponto de coleta."}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Buscar ..." />
                        <CommandEmpty>No language found.</CommandEmpty>
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
                            ? pontosColeta.find(
                                (pc) => pc.value === field.value,
                              )?.label
                            : "Selecione um ponto de entrega."}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Buscar..." />
                        <CommandEmpty>No language found.</CommandEmpty>
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
            <Button type="submit">Criar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
