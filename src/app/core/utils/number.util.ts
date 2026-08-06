export function truncateTo2Decimals(value: number): number {
  return Math.floor((value + 1e-9) * 100) / 100;
}
