import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

interface BreadcrumbItem {
    label: string
    path?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <Breadcrumb
            spacing="8px"
            separator=">"
            mb={6}
            fontSize="sm"
        >
            <BreadcrumbItem>
                <BreadcrumbLink as={RouterLink} to="/" color="gray.500" _hover={{ color: 'brand.purple.600' }}>
                    Home
                </BreadcrumbLink>
            </BreadcrumbItem>

            {items.map((item, index) => (
                <BreadcrumbItem key={index} isCurrentPage={index === items.length - 1}>
                    {item.path && index < items.length - 1 ? (
                        <BreadcrumbLink as={RouterLink} to={item.path} color="gray.500" _hover={{ color: 'brand.purple.600' }}>
                            {item.label}
                        </BreadcrumbLink>
                    ) : (
                        <Text color="gray.700" fontWeight="medium">
                            {item.label}
                        </Text>
                    )}
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    )
}
