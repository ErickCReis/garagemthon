import OngItem from "@/components/ui/ongItem";
import { ongs } from "@/data";

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col space-y-4 p-4">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">ONGs</h2>
        <p>Lista de ONGs cadastradas e que podem gerar pedidos</p>
        <div className="flex flex-col space-y-2">
          {ongs.map((ong) => (
            <OngItem key={ong.id} nome={ong.nome} id={ong.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
