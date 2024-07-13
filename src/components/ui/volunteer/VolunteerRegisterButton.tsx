"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import VolunteerInput from "@/components/ui/volunteer/volunteerInput";
import {
  criarVoluntarioFormSchema,
  type CriarVoluntarioFormValues,
} from "@/lib/validators";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function VolunteerRegisterButton() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CriarVoluntarioFormValues>({
    resolver: zodResolver(criarVoluntarioFormSchema),
    defaultValues: {},
  });

  const criarVoluntario = api.voluntarios.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Voluntário criado com sucesso!",
      });

      void router.push("/voluntarios");
      setIsOpen(false);
    },
  });

  const handleSubmit = (data: CriarVoluntarioFormValues) => {
    criarVoluntario.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Se cadastre como voluntário</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <VolunteerInput id="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <VolunteerInput id="email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de celular</FormLabel>
                  <FormControl>
                    <VolunteerInput id="phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <VolunteerInput id="cpf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilidades</FormLabel>
                  <FormControl>
                    <VolunteerInput id="skills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <Button type="submit">Criar</Button>
              <Button
                type="button"
                onClick={() => router.push("/voluntarios/adicionar-veiculo")}
              >
                Adicionar veículo
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
