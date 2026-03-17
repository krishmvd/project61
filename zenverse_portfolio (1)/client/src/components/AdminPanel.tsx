import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  featured?: boolean;
  createdAt?: number;
}

const ADMIN_CODE = "KRISHADMIN2026";

export default function AdminPanel() {
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [code, setCode] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Listen for Shift + Ctrl + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.ctrlKey && e.key === "A") {
        e.preventDefault();
        setShowCodeModal(true);
        setCode("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        },
        (error) => {
          console.error("Error loading projects:", error);
          toast.error("Error loading projects from database");
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up Firestore listener:", error);
    }
  }, []);

  const handleCodeSubmit = () => {
    if (code === ADMIN_CODE) {
      setShowCodeModal(false);
      setShowAdminPanel(true);
      toast.success("Admin panel unlocked!");
    } else {
      toast.error("Invalid admin code");
      setCode("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        toast.error("Only JPG, PNG, GIF, and WEBP formats are supported");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = async () => {
    if (!formData.title || !formData.description || !imagePreview) {
      toast.error("Please fill in all required fields and upload an image");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "projects"), {
        title: formData.title,
        description: formData.description,
        image: imagePreview,
        link: formData.link || null,
        featured: false,
        createdAt: Date.now(),
      });

      // Reset form
      setFormData({ title: "", description: "", link: "" });
      setImageFile(null);
      setImagePreview("");
      toast.success("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      {/* Code Modal */}
      <Dialog open={showCodeModal} onOpenChange={setShowCodeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enter Admin Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCodeSubmit();
                }
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                onClick={handleCodeSubmit}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Unlock
              </Button>
              <Button
                onClick={() => {
                  setShowCodeModal(false);
                  setCode("");
                }}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Panel */}
      <Dialog open={showAdminPanel} onOpenChange={setShowAdminPanel}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Admin Dashboard</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Add Project Form */}
            <div className="border border-border rounded-lg p-6 space-y-4">
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Add New Project
              </h3>

              <Input
                placeholder="Project Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <Textarea
                placeholder="Project Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />

              <Input
                placeholder="Project Link (optional)"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
              />

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Project Image
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  onChange={handleImageChange}
                  className="block w-full text-sm border border-border rounded-md p-2 cursor-pointer"
                />
                {imagePreview && (
                  <div className="relative w-full h-40 rounded-md overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <Button
                onClick={handleAddProject}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                {loading ? "Adding..." : "Add Project"}
              </Button>
            </div>

            {/* Projects List */}
            <div className="space-y-4">
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Projects ({projects.length})
              </h3>

              {projects.length === 0 ? (
                <p className="text-foreground/60 text-center py-4">
                  No projects yet
                </p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-start justify-between p-3 border border-border rounded-md hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {project.title}
                          {project.featured && (
                            <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                              Featured
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-foreground/60 truncate">
                          {project.description}
                        </p>
                      </div>
                      <div className="ml-2 flex gap-1 flex-shrink-0">
                        <button
                          onClick={() =>
                            handleToggleFeatured(project.id, project.featured || false)
                          }
                          className="p-1 hover:bg-accent/10 rounded transition-colors text-accent"
                          title={
                            project.featured
                              ? "Unfeature project"
                              : "Feature project"
                          }
                        >
                          <Star
                            className="w-4 h-4"
                            fill={project.featured ? "currentColor" : "none"}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-1 hover:bg-destructive/10 rounded transition-colors text-destructive"
                          title="Delete project"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
