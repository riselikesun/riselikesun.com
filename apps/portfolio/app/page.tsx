import { HomeAppBar, HeroSection, DirtyHandsSection, Introduction, SkillsSolarSystem, ProfessionalExperience, Hobbies, Footer, ContactMe } from "./components";

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
    </>
  );
}
