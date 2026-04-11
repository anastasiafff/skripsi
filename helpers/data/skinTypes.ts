export function getSkinTypes(skin: any) {
  if (!skin) return []

  return Object.entries(skin)
    .filter(([_, value]) => value === true)
    .map(([key]) => key)
}