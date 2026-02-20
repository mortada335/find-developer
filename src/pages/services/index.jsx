import { useState } from "react";
import Section from "@/components/layout/Section";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BadgeChip from "@/components/developer/BadgeChip";
import { mockServices } from "@/data/mock";
import {
  Linkedin,
  Mail,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ServiceItem = ({ service }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border-dashed">
      <CardHeader
        className="cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{service.title}</CardTitle>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
          )}
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-4">
          <p className="text-sm text-muted-foreground">{service.description}</p>

          {service.features.length > 0 && (
            <ol className="space-y-2">
              {service.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ol>
          )}

          <Button
            asChild
            className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
          >
            <a href={service.ctaEmail}>
              <Mail className="h-4 w-4 mr-2" />
              Contact Us
            </a>
          </Button>
        </CardContent>
      )}
    </Card>
  );
};

const Services = () => {
  return (
    <Section className="h-auto min-h-0">
      {/* Header */}
      <div className="w-full py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto">
          Professional development services offered by our partners
        </p>
      </div>

      {/* Service Providers */}
      <div className="w-full space-y-8 pb-12">
        {mockServices.map((provider) => (
          <Card
            key={provider.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-500/30 dark:hover:border-purple-400/30"
          >
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{provider.providerName}</CardTitle>
                  <a
                    href={provider.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                  </a>
                </div>
                {provider.badges.length > 0 && (
                  <div className="flex gap-1.5">
                    {provider.badges.map((badge) => (
                      <BadgeChip key={badge} badgeSlug={badge} />
                    ))}
                  </div>
                )}
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">
                Available Services
              </h3>
              <div className="space-y-3">
                {provider.services.map((service) => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Services;