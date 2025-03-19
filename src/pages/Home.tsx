import { useState, useEffect, useRef } from 'react';

const Home = () => {

  const [activeSection, setActiveSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  // const [formData, setFormData] = useState({ name: '', email: '', message: '' });


  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const typingTimeout = useRef<number | null>(null);


  const projects = [
    {
      title: "Project Management",
      description: "A simple task management website",
      tech: ["React", "TypeScript", "Tailwind", "Node.js", "Express"],
      link: "#"
    },
    {
      title: "Portfolio Website",
      description: "Modern responsive portfolio",
      tech: ["React", "Tailwind"],
      link: "#"
    }
  ];

  const skills = [
    { name: "React", level: 55 },
    { name: "TypeScript", level: 50 },
    { name: "Node.js", level: 50 },
    { name: "Tailwindcss", level: 60 }
  ];


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


  useEffect(() => {
    const updateScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);


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
      const projectsPos = projectsRef.current?.getBoundingClientRect().top ?? 0;
      const contactPos = contactRef.current?.getBoundingClientRect().top ?? 0;

      if (homePos >= 0 && homePos < window.innerHeight) {
        setActiveSection('home');
      } else if (aboutPos < window.innerHeight / 2 && aboutPos > -window.innerHeight / 2) {
        setActiveSection('about');
      } else if (projectsPos < window.innerHeight / 2 && projectsPos > -window.innerHeight / 2) {
        setActiveSection('projects');
      } else if (contactPos < window.innerHeight / 2) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
      case 'projects':
        projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'contact':
        contactRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-50">
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div 
              className="h-full bg-blue-600 transition-all duration-300" 
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
          <nav className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-lg sm:text-xl font-extrabold text-gray-800 dark:text-gray-100 tracking-widest">KAIZEEL</h1>
              
              <div className="flex items-center gap-4">
                {/* <button 
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isDark ? '🌞' : '🌙'}
                </button> */}
                <div className="hidden md:flex space-x-8">
                  {['home', 'about', 'projects', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`${
                        activeSection === section
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-600 hover:text-blue-600 dark:text-gray-300'
                      } capitalize transition-all duration-300 ease-in-out`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
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
              <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg">
                {['home', 'about', 'projects', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-full text-left px-6 py-3 ${
                      activeSection === section
                        ? 'bg-blue-50 text-blue-600 dark:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
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
            className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 pt-16"
          >
            <div className={`text-center space-y-4 ${
              activeSection === 'home' 
                ? scrollDirection === 'down' 
                  ? 'section-enter-down' 
                  : 'section-enter-up' 
                : ''
            }`}>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 tracking-widest">
                {displayText}
                <span className="typing-cursor">|</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">Scroll down to explore</p>
            </div>
          </section>

          <section
            ref={aboutRef}
            className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-700 pt-16"
          >
            <div className={`container mx-auto px-4 sm:px-6 py-16 ${
              activeSection === 'about' 
                ? scrollDirection === 'down' 
                  ? 'section-enter-down' 
                  : 'section-enter-up' 
                : ''
            }`}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">About Me</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                  I'm a passionate developer with expertise in modern web technologies. 
                  My focus is on creating efficient, scalable solutions with great user experiences.
                </p>
                <div className="space-y-6">
                  {skills.map((skill) => (
                    <div key={skill.name} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-800 dark:text-gray-200">{skill.name}</span>
                        <span className="text-blue-600 dark:text-blue-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <a 
                    href="/path/to/resume.pdf"
                    download
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={projectsRef}
            className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 pt-16"
          >
            <div className={`container mx-auto px-4 sm:px-6 py-16 ${
              activeSection === 'projects' 
                ? scrollDirection === 'down' 
                  ? 'section-enter-down' 
                  : 'section-enter-up' 
                : ''
            }`}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div key={project.title} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={contactRef}
            className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 pt-16"
          >
            <div className={`container mx-auto px-4 sm:px-6 py-16 ${
              activeSection === 'contact' 
                ? scrollDirection === 'down' 
                  ? 'section-enter-down' 
                  : 'section-enter-up' 
                : ''
            }`}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Contact Me</h2>
              {/* <form className="max-w-md mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <textarea
                  placeholder="Message"
                  className="w-full p-3 border rounded-lg h-32 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form> */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;