import { Skeleton, SimpleGrid, VStack, Card, CardHeader, CardBody } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

interface LoadingSkeletonProps {
    type: 'card' | 'list' | 'grid'
    count?: number
    columns?: { base: number; md: number; lg: number }
    spacing?: number
}

const LoadingSkeleton = ({
    type,
    count = 3,
    columns = { base: 1, md: 2, lg: 3 },
    spacing = 6
}: LoadingSkeletonProps) => {
    const renderCardSkeleton = () => (
        <Card key="skeleton" variant="outline">
            <CardHeader>
                <Skeleton height="24px" mb={2} />
                <Skeleton height="16px" />
            </CardHeader>
            <CardBody>
                <Skeleton height="60px" />
            </CardBody>
        </Card>
    )

    const renderListSkeleton = () => (
        <VStack spacing={4} align="stretch">
            {[...Array(count)].map((_, i) => (
                <Box key={i} p={4} border="2px solid" borderColor="gray.200" borderRadius="md">
                    <Skeleton height="20px" mb={2} />
                    <Skeleton height="16px" mb={2} />
                    <Skeleton height="16px" width="60%" />
                </Box>
            ))}
        </VStack>
    )

    const renderGridSkeleton = () => (
        <SimpleGrid columns={columns} spacing={spacing}>
            {[...Array(count)].map(() => renderCardSkeleton())}
        </SimpleGrid>
    )

    switch (type) {
        case 'card':
            return renderCardSkeleton()
        case 'list':
            return renderListSkeleton()
        case 'grid':
            return renderGridSkeleton()
        default:
            return renderGridSkeleton()
    }
}

export default LoadingSkeleton
