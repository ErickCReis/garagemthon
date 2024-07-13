  "use client";

  import React, { useState } from "react";
  import { useRouter } from "next/navigation";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { z } from "zod";
  import { useForm } from "react-hook-form";
  import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
  } from "@/components/ui/command";
  import { Button } from "@/components/ui/button";
  import { CheckIcon } from "lucide-react";
  import { toast } from "@/components/ui/use-toast";
  import VolunteerInput from "@/components/ui/volunteer/volunteerInput";
  import VolunteerTextarea from "@/components/ui/volunteer/volunteerTextarea";
  import VolunteerButton from "@/components/ui/volunteer/volunteerButton";
  import classNames from 'classnames';

  const skillsList = [
    { label: "Skill 1", value: "skill1" },
    { label: "Skill 2", value: "skill2" },
    { label: "Skill 3", value: "skill3" },
  ] as const;

  const volunteerFormSchema = z.object({
    name: z.string().nonempty("Nome é obrigatório."),
    email: z.string().email("Email inválido."),
    phone: z.string().nonempty("Número de celular é obrigatório."),
    cpf: z.string().nonempty("CPF é obrigatório."),
    skills: z.string().nonempty("Selecione uma habilidade."),
  });

  type VolunteerFormValues = z.infer<typeof volunteerFormSchema>;

  export function RegisterVolunteer() {
    const router = useRouter();
    const form = useForm<VolunteerFormValues>({
      resolver: zodResolver(volunteerFormSchema),
      defaultValues: {},
    });

    const handleSubmit = (data: VolunteerFormValues) => {
      console.log("Form Data Submitted: ", data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    };

    return (
      <Dialog>
        <DialogTrigger>Se cadastre como voluntário</DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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
                  <FormItem className="flex flex-col">
                    <FormLabel>Habilidades</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={classNames(
                              "justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? skillsList.find((skill) => skill.value === field.value)?.label
                              : "Selecione uma habilidade."}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput placeholder="Buscar habilidade..." />
                          <CommandEmpty>Nenhuma habilidade encontrada.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              {skillsList.map((skill) => (
                                <CommandItem
                                  value={skill.label}
                                  key={skill.value}
                                  onSelect={() => form.setValue("skills", skill.value)}
                                >
                                  <CheckIcon
                                    className={classNames(
                                      "mr-2 h-4 w-4",
                                      skill.value === field.value ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {skill.label}
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
              <div className="flex space-x-4">
                <Button type="submit">Register</Button>
                <Button type="button" onClick={() => router.push("/volunteers/add-vehicle")}>
                  Add Vehicle
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  export default RegisterVolunteer;
