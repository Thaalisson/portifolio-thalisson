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
        roles: ["Senior .NET Developer", "Backend Engineer", ".NET & React.js"],
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
          "Led a 4-person production support team — defined SLAs, classified incident criticality, assigned tasks by developer expertise, and ran direct client meetings during critical outages. Eliminated over 60% of recurring production issues through root-cause analysis and systematic fixes.\n\nCurrently based in Canada, highly adaptable, and motivated by continuous learning. Actively seeking senior or tech lead roles where I can combine deep .NET expertise with hands-on team leadership.",
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
            subtitle: "Domain isolation across layers",
            applied: "Isolated billing domain from the API and SQL Server in a CRM platform — infrastructure is swappable without touching a single business rule.",
            example: {
              label: "Layer boundary",
              code: "// Domain — zero framework deps\npublic class Invoice {\n  public InvoiceId Id { get; }\n  public Money Total { get; private set; }\n  public void ApplyDiscount(Percent p) =>\n    Total = Total.Reduce(p);\n}\n\n// Use case — orchestrates only\npublic class ApproveInvoice(IInvoiceRepo repo) {\n  public async Task Execute(Guid id) {\n    var inv = await repo.GetAsync(id);\n    inv.Approve();\n    await repo.SaveAsync(inv);\n  }\n}",
            },
          },
          {
            id: "multi-tenant",
            title: "Multi-Tenant SaaS",
            subtitle: "Shared infrastructure, isolated data per client",
            applied: "Built tenant isolation at Opid Technologies using EF Core global query filters — every query is automatically scoped to the current tenant with zero boilerplate in business code.",
            example: {
              label: "Tenant middleware + EF Core filter",
              code: "public class TenantMiddleware(ITenantResolver resolver) {\n  public async Task InvokeAsync(\n      HttpContext ctx, RequestDelegate next) {\n    TenantContext.Current =\n      await resolver.ResolveAsync(ctx);\n    await next(ctx);\n  }\n}\n\n// Auto-filters every query — no manual WHERE\nprotected override void OnModelCreating(ModelBuilder mb) {\n  mb.Entity<Invoice>()\n    .HasQueryFilter(x => x.TenantId == _tenant.Id);\n}",
            },
          },
          {
            id: "cqrs",
            title: "CQRS + MediatR",
            subtitle: "Separate write and read flows for scale",
            applied: "Decoupled billing commands from reporting queries at MFMti — commands write to SQL Server while projections feed a fast read model, reducing DB contention by 30%.",
            example: {
              label: "Command → Handler → Event",
              code: "public record CreateInvoiceCommand(\n  Guid TenantId, decimal Amount) : IRequest<InvoiceId>;\n\npublic class CreateInvoiceHandler(\n  IInvoiceRepo repo, IEventBus bus)\n  : IRequestHandler<CreateInvoiceCommand, InvoiceId> {\n  public async Task<InvoiceId> Handle(\n      CreateInvoiceCommand cmd, CancellationToken ct) {\n    var inv = Invoice.Create(cmd.TenantId, cmd.Amount);\n    await repo.SaveAsync(inv, ct);\n    await bus.PublishAsync(new InvoiceCreated(inv.Id), ct);\n    return inv.Id;\n  }\n}",
            },
          },
          {
            id: "dotnet",
            title: ".NET / Minimal API",
            subtitle: "Validation pipeline, middleware, background services",
            applied: "Built internal APIs at Opid with FluentValidation pipeline and structured error responses — zero unhandled exceptions in production for 18+ months.",
            example: {
              label: "Validation pipeline",
              code: "app.MapPost(\"/invoices\", async (\n    CreateInvoiceRequest req,\n    IValidator<CreateInvoiceRequest> v,\n    IInvoiceService svc) => {\n  var result = await v.ValidateAsync(req);\n  if (!result.IsValid)\n    return Results.ValidationProblem(\n      result.ToDictionary());\n  var id = await svc.CreateAsync(req);\n  return Results.Created($\"/invoices/{id}\", new { id });\n});",
            },
          },
          {
            id: "react",
            title: "React",
            subtitle: "Optimistic UI, virtualization, real-time dashboards",
            applied: "Built operator dashboards at Opid with optimistic updates and virtualized lists handling 10k+ rows — perceived latency dropped to near zero.",
            example: {
              label: "Optimistic update pattern",
              code: "const { mutate } = useMutation(approveInvoice, {\n  onMutate: async (id) => {\n    await queryClient.cancelQueries(['invoices']);\n    const prev = queryClient.getQueryData(['invoices']);\n    queryClient.setQueryData(['invoices'], old =>\n      old.map(x =>\n        x.id === id ? { ...x, status: 'approved' } : x\n      ));\n    return { prev };\n  },\n  onError: (_, __, ctx) =>\n    queryClient.setQueryData(['invoices'], ctx.prev),\n});",
            },
          },
          {
            id: "sql",
            title: "SQL / T-SQL",
            subtitle: "Window functions, indexes, execution plans",
            applied: "Rewrote CRM recovery reports at MFMti using window functions and covering indexes — query time dropped from 14s to 800ms on 5M-row tables.",
            example: {
              label: "Window function + CTE",
              code: "WITH RankedPayments AS (\n  SELECT\n    c.Name, p.Amount, p.CreatedAt,\n    ROW_NUMBER() OVER (\n      PARTITION BY p.CustomerId\n      ORDER BY p.CreatedAt DESC\n    ) AS rn\n  FROM Payments p\n  JOIN Customers c ON c.Id = p.CustomerId\n)\nSELECT Name, Amount, CreatedAt\nFROM RankedPayments\nWHERE rn = 1;",
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
        roles: ["Desenvolvedor Sênior .NET", "Engenheiro Backend", ".NET & React.js"],
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
          "Liderou equipe de 4 pessoas de suporte a producao — definiu SLAs, classificou criticidade de incidentes, delegou tarefas por expertise e conduziu reunioes diretas com clientes durante indisponibilidades criticas. Eliminou mais de 60% dos problemas recorrentes em producao atraves de analise de causa raiz.\n\nAtualmente no Canada, em busca de vagas senior ou tech lead onde possa combinar profundo conhecimento em .NET com lideranca tecnica de equipes.",
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
            subtitle: "Isolamento de dominio entre camadas",
            applied: "Isolei o dominio de cobranca da API e do SQL Server em uma plataforma CRM — a infraestrutura e substituivel sem tocar em nenhuma regra de negocio.",
            example: {
              label: "Limite de camada",
              code: "// Dominio — sem dependencias de framework\npublic class Invoice {\n  public InvoiceId Id { get; }\n  public Money Total { get; private set; }\n  public void ApplyDiscount(Percent p) =>\n    Total = Total.Reduce(p);\n}\n\n// Caso de uso — so orquestra\npublic class ApproveInvoice(IInvoiceRepo repo) {\n  public async Task Execute(Guid id) {\n    var inv = await repo.GetAsync(id);\n    inv.Approve();\n    await repo.SaveAsync(inv);\n  }\n}",
            },
          },
          {
            id: "multi-tenant",
            title: "Multi-Tenant SaaS",
            subtitle: "Infraestrutura compartilhada, dados isolados por cliente",
            applied: "Construi isolamento de tenant na Opid Technologies usando global query filters do EF Core — toda query e automaticamente escopada ao tenant atual sem boilerplate no codigo de negocio.",
            example: {
              label: "Middleware de tenant + filtro EF Core",
              code: "public class TenantMiddleware(ITenantResolver resolver) {\n  public async Task InvokeAsync(\n      HttpContext ctx, RequestDelegate next) {\n    TenantContext.Current =\n      await resolver.ResolveAsync(ctx);\n    await next(ctx);\n  }\n}\n\n// Filtra automaticamente toda query\nprotected override void OnModelCreating(ModelBuilder mb) {\n  mb.Entity<Invoice>()\n    .HasQueryFilter(x => x.TenantId == _tenant.Id);\n}",
            },
          },
          {
            id: "cqrs",
            title: "CQRS + MediatR",
            subtitle: "Separacao de fluxos de escrita e leitura para escala",
            applied: "Desacopiei comandos de cobranca das queries de relatorio na MFMti — comandos escrevem no SQL Server enquanto projecoes alimentam um modelo de leitura rapido, reduzindo contencao em 30%.",
            example: {
              label: "Command → Handler → Event",
              code: "public record CreateInvoiceCommand(\n  Guid TenantId, decimal Amount) : IRequest<InvoiceId>;\n\npublic class CreateInvoiceHandler(\n  IInvoiceRepo repo, IEventBus bus)\n  : IRequestHandler<CreateInvoiceCommand, InvoiceId> {\n  public async Task<InvoiceId> Handle(\n      CreateInvoiceCommand cmd, CancellationToken ct) {\n    var inv = Invoice.Create(cmd.TenantId, cmd.Amount);\n    await repo.SaveAsync(inv, ct);\n    await bus.PublishAsync(new InvoiceCreated(inv.Id), ct);\n    return inv.Id;\n  }\n}",
            },
          },
          {
            id: "dotnet",
            title: ".NET / Minimal API",
            subtitle: "Pipeline de validacao, middleware, background services",
            applied: "Construi APIs internas na Opid com pipeline FluentValidation e respostas de erro estruturadas — zero excecoes nao tratadas em producao por 18+ meses.",
            example: {
              label: "Pipeline de validacao",
              code: "app.MapPost(\"/invoices\", async (\n    CreateInvoiceRequest req,\n    IValidator<CreateInvoiceRequest> v,\n    IInvoiceService svc) => {\n  var result = await v.ValidateAsync(req);\n  if (!result.IsValid)\n    return Results.ValidationProblem(\n      result.ToDictionary());\n  var id = await svc.CreateAsync(req);\n  return Results.Created($\"/invoices/{id}\", new { id });\n});",
            },
          },
          {
            id: "react",
            title: "React",
            subtitle: "UI otimista, virtualizacao, dashboards em tempo real",
            applied: "Construi dashboards de operadores na Opid com updates otimistas e listas virtualizadas com 10k+ linhas — latencia percebida caiu para quase zero.",
            example: {
              label: "Padrao de update otimista",
              code: "const { mutate } = useMutation(approveInvoice, {\n  onMutate: async (id) => {\n    await queryClient.cancelQueries(['invoices']);\n    const prev = queryClient.getQueryData(['invoices']);\n    queryClient.setQueryData(['invoices'], old =>\n      old.map(x =>\n        x.id === id ? { ...x, status: 'approved' } : x\n      ));\n    return { prev };\n  },\n  onError: (_, __, ctx) =>\n    queryClient.setQueryData(['invoices'], ctx.prev),\n});",
            },
          },
          {
            id: "sql",
            title: "SQL / T-SQL",
            subtitle: "Window functions, indices, planos de execucao",
            applied: "Reescrevi relatorios de recuperacao de CRM na MFMti com window functions e indices cobertos — tempo de query caiu de 14s para 800ms em tabelas com 5M de linhas.",
            example: {
              label: "Window function + CTE",
              code: "WITH RankedPayments AS (\n  SELECT\n    c.Name, p.Amount, p.CreatedAt,\n    ROW_NUMBER() OVER (\n      PARTITION BY p.CustomerId\n      ORDER BY p.CreatedAt DESC\n    ) AS rn\n  FROM Payments p\n  JOIN Customers c ON c.Id = p.CustomerId\n)\nSELECT Name, Amount, CreatedAt\nFROM RankedPayments\nWHERE rn = 1;",
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
