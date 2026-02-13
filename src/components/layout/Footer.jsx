import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'

const Footer = () => {
        return (
                <footer className="border-t bg-background/50">
                        <div className="container mx-auto px-4 py-8">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                                <Link to="/" className="text-lg font-bold tracking-tight">
                                                        fin<span className="text-primary">Developer</span>
                                                </Link>
                                                <Link
                                                        target="_blank"
                                                        to="https://github.com/ht3aa/find-developer"
                                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                        <Github className="h-4 w-4" />
                                                </Link>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                                                <Link to="/plans" className="hover:text-foreground transition-colors">Plans</Link>
                                                <Link to="/services" className="hover:text-foreground transition-colors">Services</Link>
                                                <Link to="/recommended" className="hover:text-foreground transition-colors">Recommended</Link>
                                                <Link to="/special-needs-developers" className="hover:text-foreground transition-colors">Special Needs</Link>
                                                <Link to="/about" className="hover:text-foreground transition-colors">About Us</Link>
                                                <Link to="/charts" className="hover:text-foreground transition-colors">Charts</Link>
                                                <Link to="/badges" className="hover:text-foreground transition-colors">Badges</Link>
                                        </div>

                                        <p className="text-sm text-muted-foreground">
                                                © {new Date().getFullYear()} FindDeveloper
                                        </p>
                                </div>
                        </div>
                </footer>
        )
}

export default Footer
