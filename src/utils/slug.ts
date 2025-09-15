export function generateSlug(occasion: string, name: string): string {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
  
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${cleanName}-${occasion}-${randomSuffix}`;
}