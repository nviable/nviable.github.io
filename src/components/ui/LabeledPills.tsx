import { Box, Text, Wrap, WrapItem, Tag, Flex } from '@chakra-ui/react'

interface LabeledPillsProps {
  label: string
  items: string[]
  colorScheme?: string
}

// Update structure for inline display
const LabeledPills = ({ label, items, colorScheme = 'brand.purple' }: LabeledPillsProps) => (
  <Flex align="center" gap={2} flexWrap="wrap">
    <Text fontWeight="bold" whiteSpace="nowrap">{label}:</Text>
    <Wrap spacing={2}>
      {items.map((item, idx) => (
        <WrapItem key={idx}>
          <Tag size="md" variant="solid" colorScheme={colorScheme}>{item}</Tag>
        </WrapItem>
      ))}
    </Wrap>
  </Flex>
)

export default LabeledPills