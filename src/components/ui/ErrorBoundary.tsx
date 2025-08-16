import { Box, Text, Button, VStack } from '@chakra-ui/react'

interface ErrorBoundaryProps {
    error: string | null
    fallback?: React.ReactNode
    onRetry?: () => void
    showRetry?: boolean
}

const ErrorBoundary = ({
    error,
    fallback,
    onRetry,
    showRetry = true
}: ErrorBoundaryProps) => {
    if (!error) return null

    if (fallback) {
        return <>{fallback}</>
    }

    return (
        <Box
            p={6}
            border="2px solid"
            borderColor="red.200"
            borderRadius="md"
            bg="red.50"
            textAlign="center"
        >
            <VStack spacing={4}>
                <Text color="red.600" fontWeight="medium">
                    {error}
                </Text>

                {showRetry && onRetry && (
                    <Button
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        onClick={onRetry}
                    >
                        Try Again
                    </Button>
                )}
            </VStack>
        </Box>
    )
}

export default ErrorBoundary
