import { useState } from "react";
import DependencyInjectionBlog from "./DependencyInjectionBlog";
import CleanArchitectureBlog from "./CleanArchitectureBlog";

const posts = [
  { id: "di", label: "Dependency Injection", component: <DependencyInjectionBlog /> },
  { id: "clean", label: "Clean Architecture", component: <CleanArchitectureBlog /> },
];

export default function Blog() {
  const [selectedId, setSelectedId] = useState(posts[0].id);
  const selectedPost = posts.find((post) => post.id === selectedId);

  return (
    <section className="py-20 px-6 bg-background text-foreground transition-all duration-500">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Developer Insights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Sharing concepts, applying architecture patterns, and breaking down complex ideas
            step-by-step.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {posts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedId(post.id)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  selectedId === post.id
                    ? "text-green-600 bg-green-50 dark:bg-green-900/30"
                    : "text-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                }`}
              >
                {post.label}
              </button>
            ))}
          </div>
        </div>

        <div className="transition-all duration-500">{selectedPost.component}</div>
      </div>
    </section>
  );
}
