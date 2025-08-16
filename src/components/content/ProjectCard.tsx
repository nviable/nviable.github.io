import { Heading, Text, Link, CardHeader, CardBody } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import type { Project } from '../../types/content'
import ContentCard from '../ui/ContentCard'
import TagList from '../ui/TagList'

interface ProjectCardProps {
    project: Project
    showTags?: boolean
    showExternalLink?: boolean
}

const ProjectCard = ({
    project,
    showTags = true,
    showExternalLink = true
}: ProjectCardProps) => {
    return (
        <ContentCard hover>
            <CardHeader>
                <Heading size="md" mb={2}>
                    <Link
                        as={RouterLink}
                        to={`/research/${project.slug.current}`}
                        color="brand.purple.600"
                        _hover={{ color: 'brand.purple.700' }}
                    >
                        {project.title}
                    </Link>
                </Heading>
                {project.startDate && (
                    <Text fontSize="sm" color="gray.600">
                        {new Date(project.startDate).getFullYear()}
                        {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
                    </Text>
                )}
            </CardHeader>
            <CardBody pt={0}>
                <Text mb={4} noOfLines={3}>
                    {project.shortDescription}
                </Text>

                {showTags && project.tags && (
                    <TagList tags={project.tags} />
                )}

                {showExternalLink && project.url && (
                    <Link
                        href={project.url}
                        isExternal
                        color="brand.yellow.600"
                        fontSize="sm"
                        mt={4}
                        display="inline-block"
                        _hover={{ color: 'brand.yellow.700' }}
                    >
                        External Link →
                    </Link>
                )}
            </CardBody>
        </ContentCard>
    )
}

export default ProjectCard
