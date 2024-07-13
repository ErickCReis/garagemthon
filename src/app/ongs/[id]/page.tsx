import { ongs } from "@/data";

export default function Page({ params }: { params: { id: string } }) {
  const ong = ongs.find((ong) => ong.id === params.id);

  return (
    <>
      <h1>ONG</h1>
      <div className="">
        <pre>{JSON.stringify(ong, null, 2)}</pre>
      </div>
    </>
  );
}
