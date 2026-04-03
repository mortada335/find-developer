import { Link } from "react-router-dom";
import Section from "@/components/layout/Section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Search,
  ShieldCheck,
  Target,
  Heart,
  Github,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "1. Register",
    description:
      "Create your developer profile with your skills, experience, and links to your work.",
  },
  {
    icon: ShieldCheck,
    title: "2. Get Verified",
    description:
      "Go through our assessment process to earn badges that validate your skills and experience.",
  },
  {
    icon: Search,
    title: "3. Get Found",
    description:
      "Employers and clients browse the platform to find developers that match their project needs.",
  },
];

const stats = [
  { label: "Registered Developers", value: "188+" },
  { label: "Verified Developers", value: "53+" },
  { label: "Active Badges", value: "6" },
  { label: "Services Available", value: "3+" },
];

const About = () => {
  return (
    <Section className="h-auto min-h-0">
      {/* Header */}
      <div className="w-full py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
          Connecting talented developers with the opportunities they deserve
        </p>
      </div>

      <div className="w-full space-y-8 pb-12">
        {/* Mission */}
        <Card className="overflow-hidden border-purple-500/20">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-bold">Our Mission</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              DevConnect is a community-driven platform built to help
              developers worldwide showcase their skills and
              connect with top-tier employers. We believe every talented developer
              deserves to be found, regardless of their background or
              physical location. Our platform provides a transparent, skills-first
              approach to finding the right developer for your project.
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Card
                key={step.title}
                className="text-center transition-all duration-300 hover:shadow-lg hover:border-purple-500/30 dark:hover:border-purple-400/30"
              >
                <CardContent className="pt-6 space-y-3">
                  <div className="mx-auto h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <step.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator />

        {/* Values */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              Our Values
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <h4 className="font-medium">Transparency</h4>
                <p className="text-sm text-muted-foreground">
                  Every developer profile is public, with verified badges to
                  build trust.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Community First</h4>
                <p className="text-sm text-muted-foreground">
                  Built by developers, for developers, with open source values.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Inclusivity</h4>
                <p className="text-sm text-muted-foreground">
                  We welcome developers of all backgrounds and abilities.
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium">Skills Matter</h4>
                <p className="text-sm text-muted-foreground">
                  We focus on what you can do, not who you know.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Ready to join?</h2>
          <p className="text-muted-foreground">
            Register your profile today and start getting discovered.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              asChild
              className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
            >
              <Link to="/register">
                Register Now
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4 mr-1" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
