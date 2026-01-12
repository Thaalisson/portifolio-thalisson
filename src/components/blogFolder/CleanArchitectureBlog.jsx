import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Puzzle, Code } from "lucide-react";

export default function CleanArchitectureBlog() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <Layers className="text-primary w-6 h-6" />,
      title: "What is Clean Architecture?",
      content: (
        <>
          Clean Architecture is a software design philosophy proposed by Robert C. Martin
          ("Uncle Bob") that aims to separate concerns into well-defined layers, promoting{" "}
          <strong>maintainability, testability, and decoupling</strong>.
          <br />
          <br />
          The core idea is that business rules should not depend on frameworks, UI,
          databases, or any external details.
        </>
      ),
    },
    {
      icon: <Puzzle className="text-primary w-6 h-6" />,
      title: "Main Layers",
      content: (
        <ul className="list-disc list-inside space-y-2 text-left">
          <li>
            <strong>Entities</strong> - Core domain business rules
          </li>
          <li>
            <strong>Use Cases</strong> - Application-specific logic orchestrating entities
          </li>
          <li>
            <strong>Interface Adapters</strong> - Controllers, DTOs, Repositories
          </li>
          <li>
            <strong>Frameworks & Drivers</strong> - UI, Database, APIs, external tools
          </li>
        </ul>
      ),
    },
    {
      icon: <Code className="text-primary w-6 h-6" />,
      title: "Practical Example (.NET)",
      content: (
        <pre className="bg-zinc-900 text-green-200 p-4 rounded-md text-sm overflow-auto">
{`// Use case
public class CreateOrderHandler {
  private readonly IOrderRepository _repo;
  public CreateOrderHandler(IOrderRepository repo) {
    _repo = repo;
  }
  public void Handle(CreateOrderCommand cmd) {
    var order = new Order(cmd.ProductId, cmd.Quantity);
    _repo.Save(order);
  }
}`}
        </pre>
      ),
    },
  ];

  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setStep(0);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <section className="py-20 px-6 bg-background text-foreground transition-all duration-500">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Understanding Clean Architecture
        </motion.h2>
        <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
          Learn the principles behind a clean, scalable, and maintainable architecture.
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === step ? "bg-green-500 scale-125" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-xl text-left space-y-6">
          <div className="flex items-center gap-3">
            {steps[step].icon}
            <h3 className="text-2xl font-semibold">{steps[step].title}</h3>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-live="polite"
            className="text-base leading-relaxed"
          >
            {steps[step].content}
          </motion.div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              step === 0
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-zinc-800 hover:bg-zinc-700 text-white"
            }`}
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-md font-semibold transition ${
              isLastStep
                ? "bg-green-700 hover:bg-green-600 text-white"
                : "bg-green-600 hover:bg-green-500 text-white"
            }`}
          >
            {isLastStep ? "Restart" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}
