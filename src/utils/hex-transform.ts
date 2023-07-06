export const hex2rgba = (hex: string, alpha = 1) => {
  const match = hex.match(/\w\w/g) ?? [0, 0, 0]
  const [r, g, b] = match.map((x) => parseInt(String(x), 16))
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const hexToHSL = (hex: string) => {
  hex = hex.replace('#', '')

  const r = parseInt(hex.substring(0, 2), 16) / 255
  const g = parseInt(hex.substring(2, 4), 16) / 255
  const b = parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0
  if (max === min) {
    h = 0
  } else if (max === r) {
    h = ((g - b) / (max - min) + 6) % 6
  } else if (max === g) {
    h = (b - r) / (max - min) + 2
  } else {
    h = (r - g) / (max - min) + 4
  }
  h *= 60

  let l = (max + min) / 2

  let s = 0
  if (max !== min) {
    if (l <= 0.5) {
      s = (max - min) / (max + min)
    } else {
      s = (max - min) / (2 - max - min)
    }
  }

  h = Math.round(h)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return `hsl(${h}, ${s}%, ${l}%)`
}
