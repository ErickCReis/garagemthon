import { api } from "@/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const voluntario = await api.voluntarios.getById(+params.id);

  return (
    <>
      <h1>Voluntario</h1>
      <div className="">
        <pre>{JSON.stringify(voluntario, null, 2)}</pre>
      </div>
    </>
  );
}
