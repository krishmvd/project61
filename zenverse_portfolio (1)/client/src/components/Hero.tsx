import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
      style={{
        backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663377379122/ZKw26UxNFNe9xAPVbvDgWU/hero-abstract-minimal-mDddnDGsEL4o8ErWdobwFx.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/80"></div>

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-4 text-center py-20">
        <div className="space-y-6 animate-fade-in">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            W3b Dev Krish
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed">
            I build modern websites, creative UI experiences, and clean web interfaces with code and design.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base"
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground/10 font-semibold px-8 py-6 text-base"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-foreground/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
