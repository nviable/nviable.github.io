import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        brand: {
            blue: '#1a73e8', // Gumroad blue accent
            gray: '#f8f9fa', // Light background
            black: '#000000', // Text
        },
    },
    fonts: {
        heading: 'Inter, sans-serif', // Bold sans-serif like Gumroad
        body: 'Inter, sans-serif',
    },
    components: {
        Button: {
            baseStyle: {
                bg: 'brand.blue',
                color: 'white',
                borderRadius: 'md',
                px: 6,
                py: 3,
                fontWeight: 'bold',
                _hover: {
                    bg: 'brand.blue', // Maintain color, rely on animation
                    transform: 'scale(1.05)',
                    boxShadow: 'lg',
                },
                transition: 'all 0.2s ease-in-out',
            },
        },
    },
})

export default theme
