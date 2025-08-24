import Image from "next/image"

const logos = [
  { name: "Amazon", url: "https://v0.dev/placeholder.svg" },
  { name: "Dribbble", url: "https://v0.dev/placeholder.svg" },
  { name: "HubSpot", url: "https://v0.dev/placeholder.svg" },
  { name: "Notion", url: "https://v0.dev/placeholder.svg" },
  { name: "Netflix", url: "https://v0.dev/placeholder.svg" },
  { name: "Zoom", url: "https://v0.dev/placeholder.svg" },
]

export default function LogoStrip() {
  return (
    <div className="py-12 border-y border-gray-100">
      <div className="container mx-auto">
        <div className="flex justify-between items-center gap-8 overflow-hidden">
          {logos.map((logo) => (
            <div key={logo.name} className="flex-shrink-0">
              <Image
                src={logo.url || "/placeholder.svg"}
                alt={logo.name}
                width={100}
                height={40}
                className="opacity-50 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

