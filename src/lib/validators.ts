import { meiosTransporte } from "@/data/meios-transporte";
import { tiposItem } from "@/data/tipos-item";
import { z } from "zod";

export const criarPedidoFormSchema = z.object({
  pontoColeta: z.string({
    required_error: "Selecione um ponto de coleta.",
  }),
  pontoEntrega: z.string({
    required_error: "Selecione um ponto de entrega.",
  }),
  items: z.record(z.enum(tiposItem), z.number()),
  meiosTransporte: z.record(z.enum(meiosTransporte), z.boolean()),
});

export type CriarPedidoFormValues = z.infer<typeof criarPedidoFormSchema>;
