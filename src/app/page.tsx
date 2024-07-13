import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <section>
            <h2>Centros de distribuição</h2>
          </section>
          <section>
            <h2>ONGs</h2>
          </section>
          <section>
            <h2>Voluntários</h2>
          </section>
        </div>
      </main>
    </HydrateClient>
  );
}
