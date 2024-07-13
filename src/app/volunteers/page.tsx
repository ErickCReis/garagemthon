import { api } from "@/trpc/server";

export default async function Page() {
  const voluntarios = await api.voluntarios.getAll();

  return (
    <>
      <h1>Pedidos</h1>
      <div className="">
        <pre>{JSON.stringify(voluntarios, null, 2)}</pre>
      </div>
    </>
  );
}
