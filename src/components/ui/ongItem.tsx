// src/components/OngItem.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";

interface OngItemProps {
  nome: string;
  id: string;
}

const OngItem: React.FC<OngItemProps> = ({ nome, id }) => {
  const [src, setSrc] = useState(`/ongs/${id}.png`);

  return (
    <div className="flex items-center gap-4 rounded-md border p-4">
      <Image
        src={src}
        alt={`${nome} logo`}
        width={64}
        height={64}
        className="rounded-full"
        onError={() => setSrc("/ongs/default.png")}
      />
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{nome}</h3>
      </div>
    </div>
  );
};

export default OngItem;
