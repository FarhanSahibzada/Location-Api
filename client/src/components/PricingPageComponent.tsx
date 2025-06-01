import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Check, Zap, Rocket, Star } from "lucide-react"
import './pricingButton.css'

export default function PricingPageComponent() {

  const plans = [
    {
      name: "Basic",
      nameTitleColur: '#fabe7e',
      price: "$0",
      period: "forever",
      description: "Perfect for testing and small projects",
      requests: "100",
      features: ["100 API requests/month", "Basic documentation", "Community support", "Standard rate limits"],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false,
    },
    {
      name: "Premium",
      nameTitleColur: '#b06af5',
      price: "$5",
      period: "per month",
      description: "Great for growing applications",
      requests: "500",
      features: [
        "500 API requests/month",
        "Priority support",
        "Advanced documentation",
        "Higher rate limits",
        "Usage analytics",
      ],
      buttonText: "Start Pro Plan",
      buttonVariant: "default" as const,
      icon: Rocket,
      popular: true,
    },
    {
      name: "Enterprise",
      nameTitleColur: '#f46d69',
      price: "$10",
      period: "per month",
      description: "For production applications",
      requests: "1,000",
      features: [
        "1,000 API requests/month",
        "24/7 priority support",
        "Custom integrations",
        "No rate limits",
        "Advanced analytics",
        "SLA guarantee",
      ],
      buttonText: "Go Business",
      buttonVariant: "outline" as const,
      icon: Star,
      popular: false,
    },
  ]

  return (
    <div className="w-full bg-gradient-to-br from-[#0e0c16] to-[#0d111e] py-12 px-4">
      <div className="max-w-7xl mx-auto">

        <div className="text-center my-16 ">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-[#63616b] max-w-2xl mx-auto">
            Choose the perfect plan for your API needs. Start free and scale as you grow.
          </p>

          {/* beautiful button */}
          <div className="py-1.5 px-2  max-w-40 mx-auto my-8 rounded-xl
           z-0 relative
           ">
            <span className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-b from-[#b380b9] to-[#2b2635] z-[-1]">
              <span className="block w-full h-full rounded-xl bg-[#0d111e]"></span>
            </span>
            <p className="text-white font-semibold ">Monthly</p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto px-6 md:px-0">
          {plans.map((plan, index) => {
            const Icon = plan.icon

            return (
              <Card
                key={plan.name}
                className={`relative
            bg-transparent          border-2 border-[#2b2635] scale-105
                    transition-all duration-300 hover:shadow-xl`}
              >

                <CardHeader className=" pb-8">
                  <CardTitle className={`text-xl md:text-3xl font-bold`}
                    style={{ color: plan.nameTitleColur }}
                  >{plan.name}</CardTitle>
                  <CardDescription className="mt-2 text-[#63616b]">{plan.description}</CardDescription>
                  <div className="mt-6 text-center">
                    <span className="text-6xl  font-bold text-white">{plan.price}</span>

                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-semibold text-white">{plan.requests}</span>
                    <span className="text-[#63616b] ml-1">requests/month</span>
                  </div>

                  {/* second beautiful button */}

                  <Button
                    // variant={plan.buttonVariant}
                    className={`w-full relative overflow-hidden text-blue-500
                     shadow-[inset_0_0_0_2px_#3b82f6] tr-bite
  `}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-[#63616b]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-6">

                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Frequently, Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="font-semibold text-lg text-white mb-2">What happens if I exceed my limit?</h3>
              <p className="text-[#63616b] ">
                Your API requests will be temporarily throttled. You can upgrade your plan anytime to increase your
                limits.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-white">Can I change plans anytime?</h3>
              <p className="text-[#63616b]">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-white">Is there a free trial?</h3>
              <p className="text-[#63616b]">
                Our free plan gives you 100 requests per month forever. No credit card required to get started.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-white">What payment methods do you accept?</h3>
              <p className="text-[#63616b]">
                We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
