import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  GitBranch,
  PlayCircle,
  Repeat,
  FlaskConical,
  Package,
  BrainCircuit,
} from "lucide-react";

export default function DependencyInjectionBlog() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      icon: <Lightbulb className="text-primary w-6 h-6" />,
      title: "What is Dependency Injection?",
      content: (
        <>
          Dependency Injection (DI) is a design pattern that promotes{" "}
          <strong>decoupling</strong> between classes. Instead of a class creating its
          dependencies, they are <strong>provided externally</strong> by a framework or
          container.
          <br />
          <br />
          Real example: a <code>Controller</code> receives a configured{" "}
          <code>Service</code> instance instead of instantiating it manually with{" "}
          <code>new</code>.
        </>
      ),
    },
    {
      icon: <GitBranch className="text-primary w-6 h-6" />,
      title: "C# Practical Example",
      content: (
        <pre className="bg-zinc-900 text-primary/80 p-4 rounded-md text-sm overflow-auto">
{`public interface IEmailService {
    void Send(string to, string message);
}

public class EmailService : IEmailService {
    public void Send(string to, string message) {
        // Sending logic
    }
}

public class UserController {
    private readonly IEmailService _email;
    public UserController(IEmailService email) {
        _email = email;
    }
}`}
        </pre>
      ),
    },
    {
      icon: <PlayCircle className="text-primary w-6 h-6" />,
      title: "Why Use DI?",
      content: (
        <ul className="space-y-4 text-left">
          <li className="flex items-start gap-3">
            <Repeat className="w-5 h-5 mt-1 text-primary" />
            <span>Swap implementations without changing consumers</span>
          </li>
          <li className="flex items-start gap-3">
            <FlaskConical className="w-5 h-5 mt-1 text-primary" />
            <span>Easier unit testing (mocks, fakes)</span>
          </li>
          <li className="flex items-start gap-3">
            <Package className="w-5 h-5 mt-1 text-primary" />
            <span>Promotes modularity and scalability</span>
          </li>
          <li className="flex items-start gap-3">
            <BrainCircuit className="w-5 h-5 mt-1 text-primary" />
            <span>Reduces tight coupling and keeps code cleaner</span>
          </li>
        </ul>
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
          Understanding Dependency Injection (DI)
        </motion.h2>
        <p className="text-muted-foreground mb-8 text-lg max-w-2xl mx-auto">
          Learn the concept step-by-step with animations, code samples, and real-world
          examples.
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === step ? "bg-primary scale-125" : "bg-muted"
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
                ? "bg-primary/90 hover:bg-primary text-white"
                : "bg-primary hover:bg-primary/90 text-white"
            }`}
          >
            {isLastStep ? "Restart" : "Next"}
          </button>
        </div>
      </div>
    </section>
  );
}
