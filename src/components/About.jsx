import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="min-h-screen flex items-center pt-16 pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Text Content */}
          <div className="md:w-3/5 space-y-6">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-fade-in">
              Full Stack Developer
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-slide-right">
              Crafting digital experiences with code<span className="text-green-500">.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg animate-slide-up">
              Software Developer apaixonado por tecnologia, com mais de 10 anos de experiência criando e implementando soluções robustas para CRM, especialmente nos setores de telecomunicações, financeiro e cosméticos. Especialista em sistemas de cobrança e recuperação de crédito, com histórico comprovado de resultados expressivos.
              <br /><br />
              Domina linguagens como Visual Basic 6, C#, SQL Server, ASP, JavaScript e React.js. Atuou liderando equipes técnicas, otimizando sistemas em até 40% e reduzindo custos operacionais em 20%. Também gerenciou times de suporte, eliminando problemas recorrentes em mais de 60% dos casos.
              <br /><br />
              Atualmente no Canadá, em busca de novos desafios e imersão em uma nova cultura, demonstrando rápida adaptação, resiliência e vontade constante de aprender. Tem como objetivo expandir ainda mais seu repertório técnico e contribuir globalmente com soluções de alto impacto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in">
           
            </div>
          </div>

          {/* Right Code Block */}
          <div className="mt-10 md:mt-0 md:w-2/5 animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-1 bg-green-100 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-black rounded-2xl overflow-hidden aspect-square">
                <div className="p-8 text-white font-mono text-sm">
                  <div className="mb-4 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="overflow-auto">
                    <code>
                      <span className="text-green-50">const</span> <span className="text-white">developer</span> = {'{'}
                      <br />  <span className="text-green-100">name</span>: <span className="text-green-400">'Thalisson Pereira'</span>,
                      <br />  <span className="text-green-100">role</span>: <span className="text-green-400">'Full Stack Developer'</span>,
                      <br />  <span className="text-green-100">loves</span>: [
                      <br />    <span className="text-green-400">'Clean Code'</span>,
                      <br />    <span className="text-green-400">'Problem Solving'</span>,
                      <br />    <span className="text-green-400">'Learning'</span>
                      <br />  ],
                      <br />  <span className="text-green-100">greet</span>: <span className="text-green-50">function</span>() {'{'}
                      <br />    <span className="text-green-50">return</span> <span className="text-green-400">'Hello, World!'</span>;
                      <br />  {'}'}
                      <br />{' '} {'}'}
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
