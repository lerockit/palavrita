export const hex2rgba = (hex: string, alpha = 1) => {
  const match = hex.match(/\w\w/g)
  if (!match) return 'rgba(0, 0, 0, 0)'
  const [r, g, b] = match.map((x) => parseInt(String(x), 16))
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
