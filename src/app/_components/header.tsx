"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const path = usePathname();

  return (
    <nav className="flex gap-3 text-lg font-semibold">
      <Link href="/">Início</Link>
      <Link href="/pedidos" className={cn(path === "/pedidos" && "border-b-2")}>
        Pedidos
      </Link>
      <Link
        href="/voluntarios"
        className={cn(path === "/voluntarios" && "border-b-2")}
      >
        Voluntários
      </Link>
    </nav>
  );
}
