import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import VolunteerRegisterButton from "@/components/ui/volunteer/VolunteerRegisterButton";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page() {
  const voluntarios = await api.voluntarios.getAll();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Todos os Voluntários</h1>
        <VolunteerRegisterButton />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {voluntarios.map((voluntario) => (
          <Card key={voluntario.voluntario.id} className="rounded-lg border p-4 shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <div className="rounded-full bg-gray-200 p-4">
                <span className="text-6xl">👩🏻‍💻</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">{voluntario.voluntario.nome}</h2>
                <p className="text-gray-600">{voluntario.voluntario.email}</p>
                <p className="text-gray-600">{voluntario.voluntario.cpf}</p>
              </div>
            </div>
            <Link href={`/voluntarios/${voluntario.voluntario.id}`}>
              <Button className="w-full">Ver Perfil</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
