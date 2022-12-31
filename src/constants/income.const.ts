export const INCOME = {
  ASSETS: "assets",
  LIABILITY: "liability",
} as const;

export type IncomeType = typeof INCOME[keyof typeof INCOME];
