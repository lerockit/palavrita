import tailwindConfig from 'tailwind-config'
import resolveConfig from 'tailwindcss/resolveConfig'

const { theme } = resolveConfig(tailwindConfig)

export default theme
