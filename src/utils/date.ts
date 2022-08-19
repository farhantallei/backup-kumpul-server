export function getDate(value?: string | number | Date) {
  if (value) return new Date(value).toLocaleDateString();
  return new Date().toLocaleDateString();
}
