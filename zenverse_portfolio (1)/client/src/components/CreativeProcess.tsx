export default function CreativeProcess() {
  const steps = [
    {
      number: "01",
      title: "Discover",
      description:
        "Understanding your vision, goals, and target audience. Deep dive into requirements and constraints.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "Crafting intuitive interfaces with careful attention to typography, spacing, and user experience.",
    },
    {
      number: "03",
      title: "Develop",
      description:
        "Building clean, performant code using modern frameworks and best practices for scalability.",
    },
    {
      number: "04",
      title: "Deploy",
      description:
        "Launching with confidence. Optimization, testing, and continuous improvement for long-term success.",
    },
  ];

  return (
    <section
      id="process"
      className="py-20 md:py-32 bg-background relative overflow-hidden"
      style={{
        backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663377379122/ZKw26UxNFNe9xAPVbvDgWU/creative-process-bg-dqchSnFxabHWbPgkqv29r9.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/70 dark:bg-background/85"></div>

      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            My Creative Process
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A thoughtful approach to building digital experiences that matter
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-8 h-full hover:shadow-lg transition-all duration-300 hover:border-primary/50 hover:bg-card">
                {/* Number */}
                <div className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
