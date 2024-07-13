"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import urso from '/home/dorath/Documents/myCode/js-ts-frameworks/hackathon-unilever/public/urso.png';

export function Header() {
  const path = usePathname();

  return (
    <nav className="flex items-center gap-6 text-lg font-semibold">
      <Link href="/" className="flex items-center gap-2">
        <Image src={urso} alt="Lelantus Logo" width={40} height={40} />
        <span>Lelantus  |</span>
      </Link>
      <Link href="/" className={cn(path === "/" && "border-b-2")}>
        Início
      </Link>
      <Link
        href="/pedidos"
        className={cn(path.startsWith("/pedidos") && "border-b-2")}
      >
        Pedidos
      </Link>
      <Link
        href="/voluntarios"
        className={cn(path.startsWith("/voluntarios") && "border-b-2")}
      >
        Voluntários
      </Link>
      <Link
        href="/mapa"
        className={cn(path.startsWith("/mapa") && "border-b-2")}
      >
        Mapa
      </Link>
      <Link
        href="/veiculos"
        className={cn(path.startsWith("/veiculos") && "border-b-2")}
      >
        Veículos
      </Link>
    </nav>
  );
}
