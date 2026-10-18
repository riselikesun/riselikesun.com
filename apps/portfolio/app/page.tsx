import ChatbaseScript from "@/lib/ChatbaseScript";
import { HomeAppBar, HeroSection, DirtyHandsSection, Introduction, SkillsSolarSystem, ProfessionalExperience, Hobbies, Footer, ContactMe } from "./components";
import config from "./config";

export default function Home() {
  return (
    <>
      <HomeAppBar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <HeroSection />
        <Introduction />
        <DirtyHandsSection />
        <SkillsSolarSystem />
        <Hobbies />
        <ProfessionalExperience />
        <ContactMe />
      </main>
      <Footer />
      <ChatbaseScript chatbaseId={config.chatbaseId} />
    </>
  );
}
