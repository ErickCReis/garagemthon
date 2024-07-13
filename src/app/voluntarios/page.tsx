import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Page() {
  const voluntarios = await api.voluntarios.getAll();

  return (
    <>
      <div className="flex justify-between">
        <h1>Todos os Voluntários</h1>
        <Link href="/pedidos/criar">
          <Button>Adicionar Voluntário</Button>
        </Link>
      </div>
      <div className="">
        <pre>{JSON.stringify(voluntarios, null, 2)}</pre>
      </div>
    </>
  );
}
