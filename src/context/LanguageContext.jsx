import { createContext, useContext, useEffect, useCallback, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const translations = {
    en: {
      nav: {
        home: "Home",
        about: "About",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        title: "Full Stack",
        subtitle: "Developer",
        description: "Crafting elegant solutions with modern technologies.",
        descriptionSub: "Frontend aesthetics meets backend efficiency.",
        exploreWork: "Explore My Work",
        getInTouch: "Get In Touch",
      },
      heroText: {
        fullText: "Thalisson Pereira",
        roles: ["Senior .NET Developer", "Backend Engineer", "Tech Lead", ".NET & React.js"],
        valueProps: "13+ years building enterprise .NET systems · Canada & Brazil",
        cta: { work: "View My Work", resume: "Resume" },
      },
      about: {
        title: "Full Stack Developer",
        heading: "Crafting digital experiences with code",
        highlights: [
          "10+ years",
          "CRM",
          "Billing & Recovery",
          ".NET",
          "C#",
          "React",
          "Leadership",
          "Cost Reduction",
        ],
        paragraph1:
          "Software Developer with over 12 years of experience designing, building, and optimizing enterprise-grade CRM, billing, and credit recovery systems across telecom, finance, logistics, and cosmetics industries. Proven expertise in delivering scalable, high-performance solutions that drive measurable business results.",
        paragraph2:
          "Strong background in full-stack development, with deep knowledge of C#, .NET, SQL Server, ASP.NET, JavaScript, React.js, and modern frontend architectures. Demonstrated success in system optimization, achieving up to 40% reduction in operational costs and 30% acceleration in delivery pipelines through clean architecture, modular design, and performance-driven engineering practices.",
        paragraph3:
          "Experienced in technical leadership and cross-functional collaboration, having led development and support teams, streamlined workflows, and eliminated recurring production issues in over 60% of cases. Recognized for translating complex business requirements into maintainable, scalable technical solutions.\n\nCurrently based in Canada, highly adaptable, resilient, and motivated by continuous learning. Actively seeking new challenges to expand technical expertise, embrace new cultures, and contribute globally by building impactful, reliable, and user-centric software solutions.",
      },
      developer: {
        name: "Thalisson Pereira",
        role: {
          en: "Full Stack Developer",
          pt: "Desenvolvedor Full Stack",
        },
        loves: {
          en: ["Clean Code", "Problem Solving", "Learning"],
          pt: ["Codigo Limpo", "Resolucao de Problemas", "Aprendizado"],
        },
        greet: {
          en: "Hello, World!",
          pt: "Ola, Mundo!",
        },
      },
      experience: {
        eyebrow: "Career",
        title: "Work Experience",
        subtitle: "13+ years delivering enterprise systems in Brazil and Canada — from telecom CRM to SaaS platforms.",
      },
      skills: {
        title: "Technical Skills",
        subtitle: "Built for enterprise scale — from .NET APIs to React frontends, backed by 13+ years in production systems.",
        frontend: "Frontend",
        backend: "Backend",
        devtools: "DevOps & Tools",
      },
      projects: {
        title: "Featured Projects",
        subtitle: "Enterprise systems and products that drove measurable business impact — from telecom CRM to active SaaS platforms.",
        viewAll: "View All Projects",
      },
      study: {
        eyebrow: "Study area",
        title: "Applied knowledge",
        subtitle:
          "This section shows how I apply the concepts in real solutions, with quick examples and practical context.",
        topics: [
          {
            id: "clean-architecture",
            title: "Clean Architecture",
            subtitle: "Layer separation and framework independence",
            applied: "Applied to isolate the core domain in a billing platform while keeping API and database as replaceable details.",
            example: {
              label: "Use case boundary",
              code:
                "public class CreateInvoice {\n  private readonly IInvoiceRepo _repo;\n  public CreateInvoice(IInvoiceRepo repo) { _repo = repo; }\n  public void Execute(NewInvoice cmd) {\n    var invoice = Invoice.Create(cmd);\n    _repo.Save(invoice);\n  }\n}",
            },
          },
          {
            id: "dependency-injection",
            title: "Dependency Injection",
            subtitle: "Dependency control for safe evolution",
            applied: "Applied to swap gateways (email, SMS, WhatsApp) without changing business rules.",
            example: {
              label: "Constructor injection",
              code:
                "public class NotifyUser {\n  private readonly INotifier _notifier;\n  public NotifyUser(INotifier notifier) { _notifier = notifier; }\n  public Task Execute(User u) => _notifier.Send(u);\n}",
            },
          },
          {
            id: "ddd",
            title: "DDD (Domain-Driven Design)",
            subtitle: "Domain-focused modeling",
            applied: "Applied to keep the language aligned between tech and business in CRM and recovery flows.",
            example: {
              label: "Aggregate root",
              code:
                "public class Agreement {\n  public AgreementId Id { get; }\n  public Money Balance { get; private set; }\n  public void ApplyPayment(Money value) {\n    Balance = Balance.Subtract(value);\n  }\n}",
            },
          },
          {
            id: "dotnet",
            title: ".NET",
            subtitle: "Robust APIs, performance, and scalability",
            applied: "Applied to build secure APIs with validation and clear contracts for internal services.",
            example: {
              label: "Minimal API",
              code:
                "app.MapPost(\"/invoices\", async (CreateInvoiceRequest req, IInvoiceService svc) => {\n  var id = await svc.Create(req);\n  return Results.Created($\"/invoices/{id}\", id);\n});",
            },
          },
          {
            id: "react",
            title: "React",
            subtitle: "Reactive interfaces and user experience",
            applied: "Applied to build dashboards with live filters and fast feedback for operators.",
            example: {
              label: "State + memo",
              code:
                "const [query, setQuery] = useState(\"\");\nconst filtered = useMemo(\n  () => data.filter(x => x.name.includes(query)),\n  [data, query]\n);",
            },
          },
          {
            id: "sql",
            title: "SQL",
            subtitle: "Well-modeled data and efficient queries",
            applied: "Applied to optimize reports using indexes and query plans for large datasets.",
            example: {
              label: "Report query",
              code:
                "SELECT c.Name, SUM(p.Amount) AS Total\nFROM Payments p\nJOIN Customers c ON c.Id = p.CustomerId\nWHERE p.CreatedAt >= @Start\nGROUP BY c.Name\nORDER BY Total DESC;",
            },
          },
        ],
      },
      footer: {
        connect: "Let's Connect",
        follow: "Follow me on social media for updates on my latest projects and tech insights.",
        copyright: `© ${new Date().getFullYear()} Thalisson Pereira. Built with React & Tailwind CSS.`,
      },
      contact: {
        title: "Let's build something solid",
        subtitle:
          "Open to full-time roles, consulting, or collaborative side projects. Share a brief and I'll respond quickly.",
        emailLabel: "Email",
        emailValue: "thalisson_21@icloud.com",
        locationLabel: "Location",
        locationValue: "London, Ontario, Canada",
        form: {
          name: "Your name",
          email: "Your email",
          message: "Project details",
          button: "Send message",
          sending: "Sending...",
          success: "Thanks! I'll get back to you shortly.",
          sendAnother: "Send another message",
          error: "Something went wrong. Try emailing me directly.",
        },
      },
    },
    pt: {
      nav: {
        home: "Inicio",
        about: "Sobre",
        experience: "Experiencia",
        skills: "Habilidades",
        projects: "Projetos",
        contact: "Contato",
      },
      hero: {
        title: "Full Stack",
        subtitle: "Developer",
        description: "Criando solucoes elegantes com tecnologias modernas.",
        descriptionSub: "Estetica frontend encontra eficiencia backend.",
        exploreWork: "Explore Meu Trabalho",
        getInTouch: "Entre em Contato",
      },
      heroText: {
        fullText: "Thalisson Pereira",
        roles: ["Desenvolvedor Sênior .NET", "Engenheiro Backend", "Tech Lead", ".NET & React.js"],
        valueProps: "13+ anos desenvolvendo sistemas .NET enterprise · Canadá & Brasil",
        cta: { work: "Ver Meu Trabalho", resume: "Currículo" },
      },
      about: {
        title: "Full Stack Developer",
        heading: "Crafting digital experiences with code",
        highlights: [
          "10+ anos",
          "CRM",
          "Cobranca e Recuperacao",
          ".NET",
          "C#",
          "React",
          "Lideranca",
          "Reducao de custos",
        ],
        paragraph1:
          "Software Developer apaixonado por tecnologia, com mais de 10 anos de experiencia criando e implementando solucoes robustas para CRM, especialmente nos setores de telecomunicacoes, financeiro e cosmeticos. Especialista em sistemas de cobranca e recuperacao de credito, com historico comprovado de resultados expressivos.",
        paragraph2:
          "Domina linguagens como Visual Basic 6, C#, SQL Server, ASP, JavaScript e React.js. Atuou liderando equipes tecnicas, otimizando sistemas em ate 40% e reduzindo custos operacionais em 20%. Tambem gerenciou times de suporte, eliminando problemas recorrentes em mais de 60% dos casos.",
        paragraph3:
          "Atualmente no Canada, em busca de novos desafios e imersao em uma nova cultura, demonstrando rapida adaptacao, resiliencia e vontade constante de aprender. Tem como objetivo expandir ainda mais seu repertorio tecnico e contribuir globalmente com solucoes de alto impacto.",
      },
      developer: {
        name: "Thalisson Pereira",
        role: {
          en: "Full Stack Developer",
          pt: "Desenvolvedor Full Stack",
        },
        loves: {
          en: ["Clean Code", "Problem Solving", "Learning"],
          pt: ["Codigo Limpo", "Resolucao de Problemas", "Aprendizado"],
        },
        greet: {
          en: "Hello, World!",
          pt: "Ola, Mundo!",
        },
      },
      experience: {
        eyebrow: "Carreira",
        title: "Experiência Profissional",
        subtitle: "13+ anos entregando sistemas enterprise no Brasil e no Canadá — de CRM de telecom a plataformas SaaS.",
      },
      skills: {
        title: "Habilidades Tecnicas",
        subtitle: "Construido para escala enterprise — de APIs .NET a frontends React, com 13+ anos em sistemas de producao.",
        frontend: "Frontend",
        backend: "Backend",
        devtools: "DevOps & Ferramentas",
      },
      projects: {
        title: "Projetos em Destaque",
        subtitle: "Sistemas enterprise e produtos que geraram impacto mensuravel — de CRM de telecom a plataformas SaaS ativas.",
        viewAll: "Ver Todos os Projetos",
      },
      study: {
        eyebrow: "Area de estudo",
        title: "Conhecimento aplicado",
        subtitle:
          "Esta area mostra como aplico os conceitos em solucoes reais, com exemplos curtos e contexto pratico.",
        topics: [
          {
            id: "clean-architecture",
            title: "Clean Architecture",
            subtitle: "Separacao de camadas e independencia de frameworks",
            applied:
              "Aplicado para isolar o dominio central em uma plataforma de cobranca mantendo API e banco como detalhes substituiveis.",
            example: {
              label: "Limite do caso de uso",
              code:
                "public class CreateInvoice {\n  private readonly IInvoiceRepo _repo;\n  public CreateInvoice(IInvoiceRepo repo) { _repo = repo; }\n  public void Execute(NewInvoice cmd) {\n    var invoice = Invoice.Create(cmd);\n    _repo.Save(invoice);\n  }\n}",
            },
          },
          {
            id: "dependency-injection",
            title: "Dependency Injection",
            subtitle: "Controle de dependencias para evolucao segura",
            applied:
              "Aplicado para trocar gateways (email, SMS, WhatsApp) sem alterar regras de negocio.",
            example: {
              label: "Injecao por construtor",
              code:
                "public class NotifyUser {\n  private readonly INotifier _notifier;\n  public NotifyUser(INotifier notifier) { _notifier = notifier; }\n  public Task Execute(User u) => _notifier.Send(u);\n}",
            },
          },
          {
            id: "ddd",
            title: "DDD (Domain-Driven Design)",
            subtitle: "Modelagem orientada ao dominio",
            applied:
              "Aplicado para alinhar linguagem entre negocio e tecnologia em fluxos de CRM e recuperacao.",
            example: {
              label: "Aggregate root",
              code:
                "public class Agreement {\n  public AgreementId Id { get; }\n  public Money Balance { get; private set; }\n  public void ApplyPayment(Money value) {\n    Balance = Balance.Subtract(value);\n  }\n}",
            },
          },
          {
            id: "dotnet",
            title: ".NET",
            subtitle: "APIs robustas, performance e escalabilidade",
            applied:
              "Aplicado para criar APIs seguras com validacao e contratos claros para servicos internos.",
            example: {
              label: "Minimal API",
              code:
                "app.MapPost(\"/invoices\", async (CreateInvoiceRequest req, IInvoiceService svc) => {\n  var id = await svc.Create(req);\n  return Results.Created($\"/invoices/{id}\", id);\n});",
            },
          },
          {
            id: "react",
            title: "React",
            subtitle: "Interfaces reativas e experiencia do usuario",
            applied:
              "Aplicado para construir dashboards com filtros ao vivo e feedback rapido.",
            example: {
              label: "Estado + memo",
              code:
                "const [query, setQuery] = useState(\"\");\nconst filtered = useMemo(\n  () => data.filter(x => x.name.includes(query)),\n  [data, query]\n);",
            },
          },
          {
            id: "sql",
            title: "SQL",
            subtitle: "Dados bem modelados e consultas eficientes",
            applied:
              "Aplicado para otimizar relatorios com indices e planos de execucao.",
            example: {
              label: "Query de relatorio",
              code:
                "SELECT c.Name, SUM(p.Amount) AS Total\nFROM Payments p\nJOIN Customers c ON c.Id = p.CustomerId\nWHERE p.CreatedAt >= @Start\nGROUP BY c.Name\nORDER BY Total DESC;",
            },
          },
        ],
      },
      footer: {
        connect: "Vamos nos Conectar",
        follow:
          "Me siga nas redes sociais para atualizacoes sobre meus projetos mais recentes e insights de tecnologia.",
        copyright: `© ${new Date().getFullYear()} Thalisson Pereira. Construido com React & Tailwind CSS.`,
      },
      contact: {
        title: "Vamos construir algo solido",
        subtitle:
          "Disponivel para vagas, consultoria ou projetos colaborativos. Envie um breve e respondo rapido.",
        emailLabel: "Email",
        emailValue: "thalisson_21@icloud.com",
        locationLabel: "Localizacao",
        locationValue: "London, Ontario, Canada",
        form: {
          name: "Seu nome",
          email: "Seu email",
          message: "Detalhes do projeto",
          button: "Enviar mensagem",
          sending: "Enviando...",
          success: "Obrigado! Retorno em breve.",
          sendAnother: "Enviar outra mensagem",
          error: "Algo deu errado. Tente me enviar um email diretamente.",
        },
      },
    },
  };

  const t = useCallback(
    (key) => {
      const get = (lang) =>
        key.split(".").reduce((obj, k) => obj?.[k], translations[lang]);
      return get(language) || get("en") || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
