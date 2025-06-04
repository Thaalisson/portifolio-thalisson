import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

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
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact'
      },
      hero: {
        title: 'Full Stack',
        subtitle: 'Developer',
        description: 'Crafting elegant solutions with modern technologies.',
        descriptionSub: 'Frontend aesthetics meets backend efficiency.',
        exploreWork: 'Explore My Work',
        getInTouch: 'Get In Touch'
      },
      heroText: {
        fullText: "I'm Thalisson Pereira",
        roles: [
          "Software Developer",
          "Fullstack Engineer",
          "Web Design",
          ".NET & React.js"
        ]
      },
      about: {
        title: 'Full Stack Developer',
        heading: 'Crafting digital experiences with code',
        paragraph1: 'Software Developer passionate about technology, with over 10 years of experience building and implementing robust CRM solutions, especially in telecom, finance, and cosmetics sectors. Specialist in billing and credit recovery systems, with a proven track record of strong results.',
        paragraph2: 'Proficient in Visual Basic 6, C#, SQL Server, ASP, JavaScript and React.js. Led tech teams, optimized systems by up to 40% and reduced operational costs by 20%. Also managed support teams, eliminating recurring issues in over 60% of cases.',
        paragraph3: 'Currently in Canada, seeking new challenges and immersion in a new culture, demonstrating quick adaptation, resilience, and continuous learning. Aims to expand technical repertoire and contribute globally with impactful solutions.',
      },
      developer: {
        name: "Thalisson Pereira",
        role: {
          en: "Full Stack Developer",
          pt: "Desenvolvedor Full Stack"
        },
        loves: {
          en: ["Clean Code", "Problem Solving", "Learning"],
          pt: ["Código Limpo", "Resolução de Problemas", "Aprendizado"]
        },
        greet: {
          en: "Hello, World!",
          pt: "Olá, Mundo!"
        }
      },
      skills: {
        title: 'Technical Skills',
        subtitle: 'A comprehensive toolkit for building modern web applications',
        frontend: 'Frontend',
        backend: 'Backend',
        devtools: 'DevOps & Tools'
      },
      projects: {
        title: 'Featured Projects',
        subtitle: 'A selection of my recent work showcasing full-stack development capabilities',
        viewAll: 'View All Projects'
      },
      footer: {
        connect: "Let's Connect",
        follow: 'Follow me on social media for updates on my latest projects and tech insights.',
        copyright: '© 2024 Full Stack Developer. Built with React & Tailwind CSS.'
      }
    },

    pt: {
      nav: {
        home: 'Início',
        about: 'Sobre',
        skills: 'Habilidades',
        projects: 'Projetos',
        contact: 'Contato'
      },
      hero: {
        title: 'Full Stack',
        subtitle: 'Developer',
        description: 'Criando soluções elegantes com tecnologias modernas.',
        descriptionSub: 'Estética frontend encontra eficiência backend.',
        exploreWork: 'Explore Meu Trabalho',
        getInTouch: 'Entre em Contato'
      },
      heroText: {
        fullText: "Eu sou o Thalisson Pereira",
        roles: [
          "Desenvolvedor de Software",
          "Engenheiro Fullstack",
          "Design Web",
          ".NET & React.js"
        ]
      },
      about: {
        title: 'Full Stack Developer',
        heading: 'Crafting digital experiences with code',
        paragraph1: 'Software Developer apaixonado por tecnologia, com mais de 10 anos de experiência criando e implementando soluções robustas para CRM, especialmente nos setores de telecomunicações, financeiro e cosméticos. Especialista em sistemas de cobrança e recuperação de crédito, com histórico comprovado de resultados expressivos.',
        paragraph2: 'Domina linguagens como Visual Basic 6, C#, SQL Server, ASP, JavaScript e React.js. Atuou liderando equipes técnicas, otimizando sistemas em até 40% e reduzindo custos operacionais em 20%. Também gerenciou times de suporte, eliminando problemas recorrentes em mais de 60% dos casos.',
        paragraph3: 'Atualmente no Canadá, em busca de novos desafios e imersão em uma nova cultura, demonstrando rápida adaptação, resiliência e vontade constante de aprender. Tem como objetivo expandir ainda mais seu repertório técnico e contribuir globalmente com soluções de alto impacto.',
      },
      developer: {
        name: "Thalisson Pereira",
        role: {
          en: "Full Stack Developer",
          pt: "Desenvolvedor Full Stack"
        },
        loves: {
          en: ["Clean Code", "Problem Solving", "Learning"],
          pt: ["Código Limpo", "Resolução de Problemas", "Aprendizado"]
        },
        greet: {
          en: "Hello, World!",
          pt: "Olá, Mundo!"
        }
      },
      skills: {
        title: 'Habilidades Técnicas',
        subtitle: 'Um kit abrangente para construir aplicações web modernas',
        frontend: 'Frontend',
        backend: 'Backend',
        devtools: 'DevOps & Ferramentas'
      },
      projects: {
        title: 'Projetos em Destaque',
        subtitle: 'Uma seleção dos meus trabalhos recentes mostrando capacidades de desenvolvimento full-stack',
        viewAll: 'Ver Todos os Projetos'
      },
      footer: {
        connect: 'Vamos nos Conectar',
        follow: 'Me siga nas redes sociais para atualizações sobre meus projetos mais recentes e insights de tecnologia.',
        copyright: '© 2024 Full Stack Developer. Construído com React & Tailwind CSS.'
      }
    }
  };

  const t = useCallback((key) => {
    const get = (lang) => key.split('.').reduce((obj, k) => obj?.[k], translations[lang]);
    return get(language) || get('en') || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
