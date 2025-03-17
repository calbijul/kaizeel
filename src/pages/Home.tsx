import { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
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
        <nav className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-extrabold text-gray-800 tracking-widest ">KAIZEEL</h1>
            
            <div className="flex space-x-8">
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
          </div>
        </nav>
      </header>

      <div className="space-y-0">
        <section
          ref={homeRef}
          className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white"
        >
          <div className={`text-center space-y-4 ${activeSection === 'home' ? 'section-enter-active' : ''}`}>
            <h1 className="text-5xl font-bold text-gray-800 tracking-widest">Kaizeel</h1>
            <p className="text-xl text-gray-600">Scroll down to explore</p>
          </div>
        </section>

        <section
          ref={aboutRef}
          className="min-h-screen flex items-center justify-center bg-gray-100"
        >
          <div className={`container mx-auto px-6 py-16 ${
            activeSection === 'about' 
              ? scrollDirection === 'down' ? 'section-enter-down' : 'section-enter-up'
              : ''
          }`}>
            <h2 className="text-4xl font-bold mb-8 text-gray-800">About Me</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              YAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </p>
          </div>
        </section>

        <section
          ref={contactRef}
          className="min-h-screen flex items-center justify-center bg-white"
        >
          <div className={`container mx-auto px-6 py-16 ${
            activeSection === 'contact' 
              ? scrollDirection === 'down' ? 'section-enter-down' : 'section-enter-up'
              : ''
          }`}>
            <h2 className="text-4xl font-bold mb-8 text-gray-800">Contact Me</h2>
            <div className="max-w-md mx-auto space-y-4">
              
              

              {/* <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your message"
                className="w-full px-4 py-2 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Send Message
              </button> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;