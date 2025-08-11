import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      purple: {
        50: '#f3e8ff',
        100: '#e9d5ff',
        200: '#dbe4ff',
        300: '#c7d2fe',
        400: '#a5b4fc',
        500: '#818cf8',
        600: '#6366f1',
        700: '#4f46e5',
        800: '#4338ca',
        900: '#3730a3',
      },
      yellow: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12',
      },
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Lato, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: '0',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: '4px 4px 0px 0px',
        },
        _active: {
          transform: 'translateY(0px)',
          boxShadow: '2px 2px 0px 0px',
        },
      },
      variants: {
        solid: {
          bg: 'brand.purple.600',
          color: 'white',
          border: '2px solid',
          borderColor: 'black',
          boxShadow: '4px 4px 0px 0px',
        },
        outline: {
          bg: 'transparent',
          color: 'brand.purple.600',
          border: '2px solid',
          borderColor: 'brand.purple.600',
          boxShadow: '4px 4px 0px 0px',
        },
        yellow: {
          bg: 'brand.yellow.400',
          color: 'black',
          border: '2px solid',
          borderColor: 'black',
          boxShadow: '4px 4px 0px 0px',
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '0',
          border: '2px solid',
          borderColor: 'black',
          boxShadow: '4px 4px 0px 0px',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '6px 6px 0px 0px',
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.900',
      },
    },
  },
})

export default theme
