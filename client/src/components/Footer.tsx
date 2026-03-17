import { Mail, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border py-16 md:py-20">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Contact Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Let's Connect
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Have a project in mind? I'd love to hear about it. Reach out and let's create something amazing together.
          </p>

          {/* Contact Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            {/* Email */}
            <a
              href="mailto:contact@zenverse.dev"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Mail className="w-6 h-6" />
              <span className="font-medium">contact@zenverse.dev</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Github className="w-6 h-6" />
              <span className="font-medium">GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin className="w-6 h-6" />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8"></div>

        {/* Footer Text */}
        <div className="text-center">
          <p className="text-foreground/60 font-medium">
            © 2026 Krish — Built with code & vibe.
          </p>
        </div>
      </div>
    </footer>
  );
}
