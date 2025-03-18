import { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);


  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingTimeout = useRef<number | null>(null);

useEffect(() => {
  const targetText = 'Kaizeel';
  
  const typeText = () => {
    const currentText = targetText.substring(0, charIndex);
    setDisplayText(currentText);

    if (!isDeleting) {
      if (charIndex < targetText.length) {
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
    } else {
      if (charIndex > 0) {
        setCharIndex(prev => prev - 1);
      } else {
        setIsDeleting(false);
        setTimeout(() => setCharIndex(1), 500);
        return;
      }
    }

    typingTimeout.current = setTimeout(typeText, isDeleting ? 50 : 100);
  };

  typingTimeout.current = setTimeout(typeText, 100);

  return () => {
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
  };
}, [charIndex, isDeleting]);


  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    switch (section) {
      case 'home':
        homeRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'about':
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;

      const homePos = homeRef.current?.getBoundingClientRect().top ?? 0;
      const aboutPos = aboutRef.current?.getBoundingClientRect().top ?? 0;
      const contactPos = contactRef.current?.getBoundingClientRect().top ?? 0;

      if (homePos >= 0 && homePos < window.innerHeight) {
        setActiveSection('home');
      } else if (aboutPos < window.innerHeight / 2 && aboutPos > -window.innerHeight / 2) {
        setActiveSection('about');
      } else if (contactPos < window.innerHeight / 2) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 w-full bg-white shadow-sm z-50">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 tracking-widest">KAIZEEL</h1>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`${
                    activeSection === section
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  } capitalize transition-all duration-300 ease-in-out`}
                >
                  {section}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
              {['home', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`w-full text-left px-6 py-3 ${
                    activeSection === section
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      <div className="space-y-0">
        <section
          ref={homeRef}
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white pt-16 "
        >
          <div className={`text-center space-y-4 ${activeSection === 'home' ? 'section-enter-active' : ''}`}>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-widest">
              {displayText}
              <span className="typing-cursor">|</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600">Scroll down to explore</p>
          </div>
        </section>

        <section
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center bg-gray-100 pt-16"
        >
          <div className={`container mx-auto px-4 sm:px-6 py-16 ${
            activeSection === 'about' 
              ? scrollDirection === 'down' ? 'section-enter-down' : 'section-enter-up'
              : ''
          }`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">About Me</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl break-words">
              YAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </p>
          </div>
        </section>

        <section
          ref={contactRef}
          className="min-h-screen flex items-center justify-center bg-white pt-16"
        >
          <div className={`container mx-auto px-4 sm:px-6 py-16 ${
            activeSection === 'contact' 
              ? scrollDirection === 'down' ? 'section-enter-down' : 'section-enter-up'
              : ''
          }`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">Contact Me</h2>
          </div>

        </section>
      </div>
    </div>
  );
};

export default Home;