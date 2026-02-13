import {
  Navbar,
  Hero,
  About,
  Program,
  Pricing,
  Enroll,
  Footer,
} from "@/components/index";
import {
  heroSection,
  aboutSection,
  programSection,
  pricingSection,
  enrollSection,
  footerSection,
} from "@/components/index/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "База искусственного интеллекта за 2 часа",
  description: "За 2 часа вы узнаете о принципах работы ИИ и научитесь генерировать на нем изображения, видео и музыку.",
};

export default function AiLandingPage3() {
  return (
    <div className='min-h-screen bg-[#050110] selection:bg-brand-lavender/30'>
      <Navbar />
      <main>
        <Hero
          title={heroSection.title}
          description={heroSection.description}
          buttonText={heroSection.buttonText}
          buttonLink={heroSection.buttonLink}
        />
        <Program
          title={programSection.title}
          modules={programSection.modules}
        />
        <About
          title={aboutSection.title}
          description={aboutSection.description}
        />
        <Pricing
          title={pricingSection.title}
          price={pricingSection.price}
          features={pricingSection.features}
          buttonText={pricingSection.buttonText}
          buttonLink={pricingSection.buttonLink}
        />
        <Enroll
          title={enrollSection.title}
          description={enrollSection.description}
        />
      </main>
      <Footer contacts={footerSection.contacts} legal={footerSection.legal} info={footerSection.info} />
    </div>
  );
}
