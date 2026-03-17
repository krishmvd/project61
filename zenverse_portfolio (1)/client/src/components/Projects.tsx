import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "sonner";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  featured?: boolean;
  createdAt?: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Listen for Firestore projects in real-time
  useEffect(() => {
    try {
      const q = query(
        collection(db, "projects"),
        orderBy("createdAt", "desc")
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const projectsList: Project[] = [];
          snapshot.forEach((doc) => {
            projectsList.push({
              id: doc.id,
              ...doc.data(),
            } as Project);
          });
          setProjects(projectsList);
          setLoading(false);
        },
        (error) => {
          console.error("Error loading projects:", error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
      setLoading(false);
    }
  }, []);

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      toast.success("Project deleted");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      await updateDoc(doc(db, "projects", id), {
        featured: !currentFeatured,
      });
      toast.success(
        !currentFeatured ? "Project featured!" : "Project unfeatured"
      );
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    }
  };

  // Separate featured and regular projects
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            A selection of recent work showcasing modern web design and development
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-foreground/60">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-foreground/60 mb-4">
              No projects yet. Use the admin panel (Shift + Ctrl + A) to add your first project.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Projects - 2 columns */}
            {featuredProjects.length > 0 && (
              <div className="mb-12">
                <h3
                  className="text-2xl font-bold text-foreground mb-8"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Highlighted Work
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDelete={handleDeleteProject}
                      onToggleFeatured={handleToggleFeatured}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Projects - 2 columns, then 2x2 */}
            {regularProjects.length > 0 && (
              <div>
                {regularProjects.length > 0 && (
                  <h3
                    className="text-2xl font-bold text-foreground mb-8"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Other Projects
                  </h3>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {regularProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onDelete={handleDeleteProject}
                      onToggleFeatured={handleToggleFeatured}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  onDelete,
  onToggleFeatured,
}: {
  project: Project;
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string, currentFeatured: boolean) => void;
}) {
  return (
    <div className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      {/* Image */}
      <div className="relative overflow-hidden bg-secondary h-48 md:h-56">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl font-bold text-foreground mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {project.title}
        </h3>
        <p className="text-foreground/70 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">View</span>
            </a>
          )}

          {/* Admin Controls - visible only on hover */}
          <div className="ml-auto flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() =>
                onToggleFeatured(project.id, project.featured || false)
              }
              className="p-1.5 hover:bg-secondary rounded transition-colors"
              title={project.featured ? "Unfeature" : "Feature"}
            >
              <Star
                className={`w-4 h-4 ${
                  project.featured
                    ? "fill-primary text-primary"
                    : "text-foreground/40"
                }`}
              />
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="p-1.5 hover:bg-secondary rounded transition-colors text-destructive"
              title="Delete"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
