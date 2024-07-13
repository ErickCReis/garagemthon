export const meiosTransporte = [
  "Carro",
  "Caminhao",
  "Barco",
  "Drone",
  "Trator",
  "Helicoptero",
] as const;
export type MeioTransporte = (typeof meiosTransporte)[number];

export const tiposItem = ["p", "m", "g"] as const;
export type TipoItem = (typeof tiposItem)[number];

export const ongs = [
  { nome: "Cruz Vermelha Brasileira", id: "cruz-vermelha" },
  { nome: "Defesa Civil do Rio Grande do Sul", id: "defesa-civil-rs" },
  {
    nome: "Ação da Cidadania Contra a Fome, a Miséria e Pela Vida",
    id: "acao-cidadania",
  },
  {
    nome: "Instituto Humanitas Unisinos (IHU)",
    id: "instituto-humanitas-unisinos",
  },
  {
    nome: "Lions Club International (Distrito LD-3)",
    id: "lions-club-international",
  },
];
