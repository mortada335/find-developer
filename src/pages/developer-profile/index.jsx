import { useParams } from 'react-router-dom'
import Section from '@/components/layout/Section'

const DeveloperProfile = () => {
        const { slug } = useParams()

        return (
                <Section>
                        <h1 className="text-3xl font-bold">Developer Profile</h1>
                        <p className="text-muted-foreground mt-2">Viewing profile: {slug}</p>
                </Section>
        )
}

export default DeveloperProfile
