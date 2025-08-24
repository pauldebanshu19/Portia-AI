import Header from "../components/Header"
import Hero from "../components/Hero"
import FAQ from "../components/FAQ"
import Footer from "../components/Footer"
import Contribute from "@/components/Contribute"
import dynamic from "next/dynamic";

const Features = dynamic(() => import("@/components/Features"));

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main >
        <Hero />
        <Features />
        <Contribute/>
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

