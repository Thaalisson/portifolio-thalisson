import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { theme, cycleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'pt' : 'en');
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') },
    
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-lg'
        : 'bg-transparent'
      }`}>
      <div className="flex items-center justify-between h-16 px-6 lg:px-8">
        {/* Logo colado à esquerda */}
        <div className="shrink-0 mr-auto">
          <button
            onClick={() => scrollToSection('home')}
            className="font-mono text-xl font-bold text-foreground hover:text-green-600 transition-colors"
          >
            &lt;Portfolio /&gt;
          </button>
        </div>

        {/* Menu e controles à direita */}
        <div className="flex items-center space-x-8">
          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, -1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg font-mono transition-all duration-300 ${activeSection === item.id
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/30'
                    : 'text-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className={`ml-4 px-6 py-2 rounded-lg font-mono transition-all duration-300 ${activeSection === 'contact'
                  ? 'text-green-600 bg-green-50 dark:bg-green-900/30'
                  : 'text-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                }`}
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Controles de tema e idioma */}
          <div className="hidden md:flex items-center gap-2 border-l border-border pl-4">
            <button
              onClick={cycleTheme}
              className="p-2 rounded-lg text-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
              title={theme === 'light' ? 'Dark mode' : 'Light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-foreground hover:text-green-600 font-mono text-sm flex items-center gap-1 transition-all duration-300"
              title="Change language"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={cycleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={toggleLanguage} className="text-sm font-mono">
              {language.toUpperCase()}
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
        <div className="bg-background border-t border-border px-6 py-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg font-mono transition-all duration-300 ${activeSection === item.id
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/30'
                    : 'text-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
