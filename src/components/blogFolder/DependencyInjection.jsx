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
                    Dependency Injection (DI) is a design pattern that promotes **decoupling** between classes.
                    Instead of a class creating its dependencies, they are **provided externally** — by a framework or container.
                    <br /><br />
                    Real example: a <code>Controller</code> receives a configured <code>Service</code> instance instead of instantiating it manually with `new`.
                </>
            ),
        },
        {
            icon: <GitBranch className="text-primary w-6 h-6" />,
            title: "C# Practical Example",
            content: (
            <pre className="bg-zinc-900 text-green-200 p-4 rounded-md text-sm overflow-auto">
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
                        <span>Reduces tight coupling → cleaner code</span>
                    </li>
                </ul>
            ),
        },
    ];

    return (
        <section className="py-20 px-6 bg-background text-foreground transition-all duration-500">
            <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                    className="text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Understanding Dependency Injection (DI)
                </motion.h2>
                <p className="text-muted-foreground mb-12 text-lg">
                    Learn the concept step-by-step with practical examples and clean visuals.
                </p>

                <div className="bg-card border border-border rounded-xl p-6 shadow-xl text-left space-y-6">
                    <div className="flex items-center gap-3">
                        {steps[step].icon}
                        <h3 className="text-2xl font-semibold">{steps[step].title}</h3>
                    </div>
                    <motion.div
                        className="text-base leading-relaxed"
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {steps[step].content}
                    </motion.div>
                </div>

                <div className="flex justify-center gap-4 mt-10">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-md transition"
                        >
                            Back
                        </button>
                    )}
                    {step < steps.length - 1 && (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-md transition"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
