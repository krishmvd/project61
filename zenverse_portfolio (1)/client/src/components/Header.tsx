import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-background"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: "'Playfair Display', serif" }}>
            zenverse
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("home")}
            className="nav-link"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="nav-link"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="nav-link"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="nav-link"
          >
            Contact
          </button>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-secondary transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-foreground" />
          ) : (
            <Sun className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>
    </header>
  );
}
