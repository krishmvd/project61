import { Code2, Palette, Zap, GitBranch, MessageSquare } from "lucide-react";

const skillCategories = [
  {
    title: "Core Web",
    skills: ["HTML", "CSS3", "JavaScript (ES6)"],
    icon: Code2,
  },
  {
    title: "Frontend Development",
    skills: ["React.js", "Context API", "Redux", "React Hooks"],
    icon: Palette,
  },
  {
    title: "Web Skills",
    skills: ["REST API Integration", "UI/UX Website Design", "Performance Optimization"],
    icon: Zap,
  },
  {
    title: "Tools",
    skills: ["GitHub (Version Control)"],
    icon: GitBranch,
  },
  {
    title: "Soft Skills",
    skills: ["Communication"],
    icon: MessageSquare,
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-background"
      style={{
        backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663377379122/ZKw26UxNFNe9xAPVbvDgWU/skills-pattern-4GqtRgfsDtSNzkCZax79Xf.webp')",
        backgroundSize: "300px 300px",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Skills & Expertise
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern web experiences
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/50 hover:bg-card"
              >
                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {category.title}
                </h3>

                {/* Skills List */}
                <ul className="space-y-2">
                  {category.skills.map((skill, idx) => (
                    <li
                      key={idx}
                      className="text-foreground/80 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
