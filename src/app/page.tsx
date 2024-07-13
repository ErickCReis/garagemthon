import { Button } from "@/components/ui/button";
import { ongs } from "@/data";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex items-center justify-center gap-12 px-4 py-16">
        <section>
          <h2>ONGs</h2>
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
        <section>
          <h2>Voluntários</h2>
        </section>
        <iframe
          src="https://www.google.com/maps/d/embed?mid=1ZlKA__gK8tH-WY6mbDeQzltsiwao7Q8&ehbc=2E312F"
          width="640"
          height="480"
        ></iframe>
      </div>
    </main>
  );
}
