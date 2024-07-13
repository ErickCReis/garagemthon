"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const path = usePathname();

  return (
    <nav className="flex gap-6 text-lg font-semibold">
      <Link href="/" className={cn(path === "/" && "border-b-2")}>
        Início
      </Link>
      <Link href="/pedidos" className={cn(path === "/pedidos" && "border-b-2")}>
        Pedidos
      </Link>
      <Link
        href="/voluntarios"
        className={cn(path === "/voluntarios" && "border-b-2")}
      >
        Voluntários
      </Link>
      <Link href="/mapa" className={cn(path === "/mapa" && "border-b-2")}>
        Mapa
      </Link>
      <Link
        href="/veiculos"
        className={cn(path === "/veiculos" && "border-b-2")}
      >
        Veículos
      </Link>
    </nav>
  );
}
