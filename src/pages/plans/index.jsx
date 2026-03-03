import Section from "@/components/layout/Section";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "0",
    currency: "IQD",
    period: "forever",
    description: "Get started and showcase your profile",
    features: [
      { text: "Basic developer profile", included: true },
      { text: "Add up to 3 skills", included: true },
      { text: "Public profile page", included: true },
      { text: "Badge eligibility", included: true },
      { text: "Priority listing", included: false },
      { text: "CV upload", included: false },
      { text: "Projects showcase", included: false },
      { text: "Recommendations", included: false },
    ],
    cta: "Get Started",
    popular: false,
    variant: "outline",
  },
  {
    name: "Pro",
    price: "25,000",
    currency: "IQD",
    period: "month",
    description: "Stand out with a complete developer profile",
    features: [
      { text: "Full developer profile", included: true },
      { text: "Unlimited skills", included: true },
      { text: "Public profile page", included: true },
      { text: "Badge eligibility", included: true },
      { text: "Priority listing", included: true },
      { text: "CV upload", included: true },
      { text: "Up to 5 projects", included: true },
      { text: "Recommendations", included: false },
    ],
    cta: "Upgrade to Pro",
    popular: true,
    variant: "default",
  },
  {
    name: "Enterprise",
    price: "75,000",
    currency: "IQD",
    period: "month",
    description: "Maximum visibility and all premium features",
    features: [
      { text: "Full developer profile", included: true },
      { text: "Unlimited skills", included: true },
      { text: "Public profile page", included: true },
      { text: "Badge eligibility", included: true },
      { text: "Priority listing", included: true },
      { text: "CV upload", included: true },
      { text: "Unlimited projects", included: true },
      { text: "Unlimited recommendations", included: true },
    ],
    cta: "Contact Us",
    popular: false,
    variant: "outline",
  },
];

const Plans = () => {
  return (
    <Section className="h-auto min-h-0">
      {/* Header */}
      <div className="w-full py-12 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent animate-fade-in">
          Plans & Pricing
        </h1>
        <p className="text-muted-foreground text-lg mt-3 max-w-2xl mx-auto animate-slide-up">
          Choose the plan that fits your needs and start getting discovered
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pb-12">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg card-animated ${
              plan.popular
                ? "border-purple-500 dark:border-purple-400 shadow-md"
                : "hover:border-purple-500/30 dark:hover:border-purple-400/30"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0">
                <Badge className="rounded-none rounded-bl-lg bg-purple-600 hover:bg-purple-600 text-white">
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground ml-1">
                  {plan.currency}
                </span>
                <span className="text-sm text-muted-foreground">
                  /{plan.period}
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex-1 pt-2">
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 text-sm ${
                      feature.included
                        ? "text-foreground"
                        : "text-muted-foreground line-through"
                    }`}
                  >
                    {feature.included ? (
                      <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                asChild
                variant={plan.variant}
                className={`w-full ${
                  plan.popular
                    ? "btn-glow bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-600 dark:hover:bg-purple-700 dark:text-white"
                    : "btn-animated"
                }`}
              >
                <Link to="/register">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Plans;
