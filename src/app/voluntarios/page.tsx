import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VolunteerRegisterButton from "@/components/ui/volunteer/VolunteerRegisterButton";
import { api } from "@/trpc/server";
import Link from "next/link";

const emojis = ["👩🏻‍💻", "👨🏻‍💻", "👩🏻‍🔬", "👨🏻‍🔬", "👩🏻‍🏫", "👨🏻‍🏫"];

export default async function Page() {
  const voluntarios = await api.voluntarios.getAll();

  return (
    <main className="space-y-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Todos os Voluntários</h1>
        <VolunteerRegisterButton />
      </div>
      <p>Encontre voluntários prontos para ajudar</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {voluntarios.map((voluntario) => {
          const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
          return (
            <Card
              key={voluntario.voluntario.id}
              className="rounded-lg border p-4 shadow-md"
            >
              <div className="mb-4 flex items-center space-x-4">
                <div className="rounded-full bg-gray-200 p-4">
                  <span className="text-6xl">{randomEmoji}</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">
                    {voluntario.voluntario.nome}
                  </h2>
                  <p className="text-gray-600">{voluntario.voluntario.email}</p>
                  <p className="text-gray-600">{voluntario.voluntario.cpf}</p>
                </div>
              </div>
              <Link href={`/voluntarios/${voluntario.voluntario.id}`}>
                <Button className="w-full">Ver Perfil</Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
