export const meiosTransporte = ["Carro", "Caminhao", "Barco", "Avião"] as const;

export type MeioTransporte = (typeof meiosTransporte)[number];
