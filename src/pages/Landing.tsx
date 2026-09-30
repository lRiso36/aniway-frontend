import { LandingHero } from "../components/ui/landing/LandingHero";
import { TopNavbar } from "../components//ui/landing/TopNav";
import { TrendingSection } from "../components/ui/landing/TrendingSection";
import { LandingFeatures } from "../components/ui/landing/LandingFeatures";
import { LandingSocialPreview } from "../components/ui/landing/LandingSocialPreview";
import { JoinLanding } from "../components/ui/landing/JoinLanding";


export const Landing = () => {
    return (

        <main className="
            min-h-screen
            bg-gradient-to-b
            from-[#020204]
            via-[#04050A]
            to-[#08090F]
            text-white
            ">

            <TopNavbar />

            <section className="">
                <LandingHero />
            </section>

            <section className="pt-10">
                <div className="max-w-7xl mx-auto px-8">
                    <LandingSocialPreview />
                </div>
            </section>

            <section className="pt-18">
                <div className="max-w-7xl mx-auto px-8">
                    <LandingFeatures />
                </div>
            </section>



            <section className="pt-18">
                <div className="max-w-7xl mx-auto px-8">
                    <TrendingSection />
                </div>
            </section>

            <section className="">
                <div className="max-w-7xl mx-auto px-8">
                    <JoinLanding />
                </div>
            </section>
        </main>
    )
}