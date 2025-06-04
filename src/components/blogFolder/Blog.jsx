import { useState } from "react";
import DependencyInjection from "./DependencyInjection";
import CleanArchitecture from "./CleanArchitecture";
// Add more posts here as you create them

const posts = [
  { id: "di", label: "Dependency Injection", component: <DependencyInjection /> },
  { id: "clean", label: "Clean Architecture", component: <CleanArchitecture /> },
  // { id: "cqrs", label: "CQRS", component: <CqrsPattern /> },
];

export default function Blog() {
  const [selectedId, setSelectedId] = useState(posts[0].id);
  const activePost = posts.find((post) => post.id === selectedId);

  return (
    <section className="py-20 px-6 bg-background text-foreground transition-all duration-500">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Developer Insights
        </h2>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedId(post.id)}
              className={`px-4 py-2 rounded-md border text-sm font-medium transition-all
                ${
                  selectedId === post.id
                    ? "bg-primary text-white border-transparent"
                    : "bg-muted text-foreground border-border hover:bg-muted/80"
                }`}
            >
              {post.label}
            </button>
          ))}
        </div>

        {/* Dynamic Post Rendering */}
        <div>{activePost.component}</div>
      </div>
    </section>
  );
}
