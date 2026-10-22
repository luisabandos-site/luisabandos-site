const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

/** "2025-03" → "Mar 2025"; "2025-03-14" → "14 Mar 2025". */
export function formatPhotoDate(date: string): string {
  const [year, month, day] = date.split("-");
  const name = months[Number(month) - 1];
  if (!year || !name) return date;
  const label = `${name.charAt(0).toUpperCase()}${name.slice(1)} ${year}`;
  return day ? `${Number(day)} ${label}` : label;
}
