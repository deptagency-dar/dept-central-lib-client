import { colors } from '../constants'
import { ColorPalette, ColorShade } from '../types'

function getRgbFromColor(color: string): number[] {
  const hexMatch = getHexMatch(color)?.groups
  return color.startsWith('#') && hexMatch
    ? [
        parseInt(hexMatch.red, 16),
        parseInt(hexMatch.green, 16),
        parseInt(hexMatch.blue, 16),
      ]
    : getRgbMatch(color)?.map(Number) || []
}

function getRgbMatch(rgbColor: string): RegExpMatchArray | null {
  return rgbColor.match(/\d+/g)
}

function getHexMatch(hexColor: string): RegExpExecArray | null {
  return /^#?(?<red>[a-f\d]{2})(?<green>[a-f\d]{2})(?<blue>[a-f\d]{2})$/i.exec(
    hexColor,
  )
}

export function getContrastColor(inputColor: string): string {
  const originalRgb = getRgbFromColor(inputColor)

  if (originalRgb.length < 3) return '#000000'

  const [r, g, b] = originalRgb
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  return brightness > 128 ? '#000000' : '#ffffff'
}

export function getLightenColor(inputColor: string, lightness = 10): string {
  const originalRgb = getRgbFromColor(inputColor)

  if (originalRgb.length < 3) return inputColor

  const adjustedRgb = originalRgb.map((channel) =>
    Math.min(255, channel + (255 - channel) * (lightness / 100)),
  )
  return `rgb(${adjustedRgb.join(', ')})`
}

export function getDarkenColor(inputColor: string, darkness = 10): string {
  const originalRgb = getRgbFromColor(inputColor)

  if (originalRgb.length < 3) return inputColor

  const adjustedRgb = originalRgb.map((channel) =>
    Math.max(0, channel - (channel * darkness) / 100),
  )

  return `rgb(${adjustedRgb.join(', ')})`
}

export const getColor = (
  scheme: keyof ColorPalette,
  shade: keyof ColorShade,
): string => {
  return colors[scheme][shade] ?? colors[scheme][500]!
}
