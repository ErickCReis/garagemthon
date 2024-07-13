import { meiosTransporte, tiposItem } from "@/data";
import { z } from "zod";

export const criarPedidoFormSchema = z.object({
  donoId: z.string(),
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

export const criarVoluntarioFormSchema = z.object({
  name: z.string({ required_error: "Nome é obrigatório." }),
  email: z.string().email("Email inválido."),
  phone: z.string({ required_error: "Número de celular é obrigatório." }),
  cpf: z.string({ required_error: "CPF é obrigatório." }),
  skills: z.string({ required_error: "Selecione uma habilidade." }),
});

export type CriarVoluntarioFormValues = z.infer<
  typeof criarVoluntarioFormSchema
>;
