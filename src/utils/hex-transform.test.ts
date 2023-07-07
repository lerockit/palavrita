import { hex2rgba } from './hex-transform'

describe('hex2rgba', () => {
  it('Should return correctly converted when valid hex is passed', () => {
    const fakeHex = '#ffffff'
    expect(hex2rgba(fakeHex, 0.5)).toBe('rgba(255, 255, 255, 0.5)')
  })

  it('Should return default value when invalid hex is passed', () => {
    const fakeHex = '#'
    expect(hex2rgba(fakeHex)).toBe('rgba(0, 0, 0, 0)')
  })
})
