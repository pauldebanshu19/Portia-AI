import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="container mx-auto py-20">
      <div className="bg-gray-50 rounded-3xl p-12 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h2 className="text-3xl font-bold mb-4">Let&apos;s make things happen</h2>
          <p className="text-gray-600 mb-8">
            Contact us today to learn more about how our digital marketing services can help your business grow and
            succeed online.
          </p>
          <Button className="rounded-full bg-black text-white hover:bg-gray-800">Get your free proposal</Button>
        </div>
        <div className="absolute right-0 bottom-0 w-64 h-64">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-[#e5fe90] rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center text-4xl">🙂</div>
          </div>
        </div>
      </div>
    </section>
  );
}
