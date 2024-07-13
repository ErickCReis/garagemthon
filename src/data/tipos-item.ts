export const tiposItem = ["p", "m", "g"] as const;

export type TipoItem = (typeof tiposItem)[number];
