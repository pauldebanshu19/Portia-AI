import { Card, CardContent } from "@/components/ui/card"
import { Search, MousePointer, Share2, Mail } from "lucide-react"
import Link from "next/link"

const services = [
  {
    title: "Search engine optimization",
    icon: Search,
    description: "Learn more",
    bgColor: "bg-white",
    textColor: "text-black",
  },
  {
    title: "Pay per click advertising",
    icon: MousePointer,
    description: "Learn more",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    title: "Social media marketing",
    icon: Share2,
    description: "Learn more",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    title: "E-mail marketing",
    icon: Mail,
    description: "Learn more",
    bgColor: "bg-white",
    textColor: "text-black",
  },
]

export default function Services() {
  return (
    <section className="py-20 container mx-auto">
      <div className="mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-[#e5fe90] text-black font-medium mb-4">Services</span>
        <p className="text-gray-600 max-w-2xl">
          As our digital marketing agency, we offer a range of services to help businesses grow and succeed online.
          These services include:
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service) => (
          <Card key={service.title} className={`${service.bgColor} border rounded-3xl overflow-hidden`}>
            <CardContent className="p-8">
              <service.icon className={`w-8 h-8 ${service.textColor} mb-4`} />
              <h3 className={`text-xl font-semibold mb-4 ${service.textColor}`}>{service.title}</h3>
              <Link href="#" className={`flex items-center gap-2 ${service.textColor}`}>
                {service.description}
                <span className="text-[#e5fe90]">→</span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

