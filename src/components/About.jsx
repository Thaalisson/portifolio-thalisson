import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t, language } = useLanguage();
  const dev = t("developer");

  const role = dev.role[language];
  const loves = dev.loves[language];
  const greet = dev.greet[language];

  return (
    <section id="about" className="min-h-screen flex items-center pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Text Content */}
          <div className="md:w-3/5 space-y-6">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-fade-in">
              {t("about.title")}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-right">
              Crafting digital experiences with code
              <span className="text-green-500">.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-slide-up">
              {t("about.paragraph1")}
              <br /><br />
              {t("about.paragraph2")}
              <br /><br />
              {t("about.paragraph3")}
            </p>
          </div>

          {/* Right Code Block */}
          <div className="mt-10 md:mt-0 md:w-2/5 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-1 bg-green-100 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-square">
                <div className="p-8 text-white font-mono text-lg">
                  <div className="mb-4 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="overflow-auto">
                    <code>
                      <span className="text-green-50">const</span>{" "}
                      <span className="text-white">developer</span> = {"{"}
                      <br />{"  "}
                      <span className="text-green-100">name</span>:{" "}
                      <span className="text-green-400">'{dev.name}'</span>,
                      <br />{"  "}
                      <span className="text-green-100">role</span>:{" "}
                      <span className="text-green-400">'{role}'</span>,
                      <br />{"  "}
                      <span className="text-green-100">loves</span>: [
                      <br />{"    "}
                      <span className="text-green-400">'{loves[0]}'</span>,
                      <br />{"    "}
                      <span className="text-green-400">'{loves[1]}'</span>,
                      <br />{"    "}
                      <span className="text-green-400">'{loves[2]}'</span>
                      <br />{"  "}],
                      <br />{"  "}
                      <span className="text-green-100">greet</span>:{" "}
                      <span className="text-green-50">function</span>() {"{"}
                      <br />{"    "}
                      <span className="text-green-50">return</span>{" "}
                      <span className="text-green-400">'{greet}'</span>;
                      <br />{"  }"}
                      <br />
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
