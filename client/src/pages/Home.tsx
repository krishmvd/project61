import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CreativeProcess from "@/components/CreativeProcess";
import Footer from "@/components/Footer";
import AdminPanel from "@/components/AdminPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <CreativeProcess />
        <Footer />
      </main>
      <AdminPanel />
    </div>
  );
}
