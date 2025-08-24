import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const cases = [
  {
    title:
      "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in online orders and a 30% increase in sales.",
  },
  {
    title:
      "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for 15+ key terms and a 200% increase in organic traffic.",
  },
  {
    title:
      "For a national retail chain, we created a social media marketing campaign that increased engagement by 300% and generated a 25% increase in sales.",
  },
]

export default function CaseStudies() {
  return (
    <section className="container mx-auto py-20">
      <div className="mb-12">
        <span className="inline-block px-4 py-2 rounded-full bg-[#e5fe90] text-black font-medium mb-4">Case study</span>
        <p className="text-gray-600 max-w-2xl">
          Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {cases.map((item, index) => (
          <Card key={index} className="bg-black text-white rounded-3xl">
            <CardContent className="p-8">
              <p className="mb-8">{item.title}</p>
              <Link href="#" className="flex items-center gap-2 text-[#e5fe90]">
                Learn more
                <span>→</span>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

