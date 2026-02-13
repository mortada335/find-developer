import { Link } from 'react-router-dom'
import Section from '@/components/layout/Section'
import { Button } from '@/components/ui/button'

const NotFound = () => {
        return (
                <Section className="items-center justify-center">
                        <h1 className="text-6xl font-bold text-primary">404</h1>
                        <p className="text-xl text-muted-foreground mt-4">Page not found</p>
                        <Button asChild className="mt-6">
                                <Link to="/">Back to Home</Link>
                        </Button>
                </Section>
        )
}

export default NotFound
