import { Button } from "@/components/ui/button";
import { ongs } from "@/data";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">ONGs</h2>
        <p>Lista de ONGs cadastradas e que podem gerar pedidos</p>
        <div className="flex flex-col space-y-2">
          {ongs.map((ong) => (
            <Link key={ong.id} href={`/ongs/${ong.id}`}>
              <Button variant="outline" className="flex w-full gap-2">
                {ong.nome}
              </Button>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
