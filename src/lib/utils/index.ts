export function parseDDMMYYYY(dateStr: string): Date | null {
  const [day, month, year] = dateStr.split("/").map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day); // month tính từ 0
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
};