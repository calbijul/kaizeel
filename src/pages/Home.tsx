import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FluidButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const FluidButton = ({ children, className, onClick }: FluidButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden ${className}`}
      initial={{ backgroundColor: "#475569", color: "#fff" }}
      whileHover={{
        backgroundColor: "#cbd5e1",
        color: "#000",
        transition: { duration: 0.8, ease: "easeInOut" },
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ border: "none" }}
    >
      <motion.span
        className="absolute rounded-full bg-white opacity-20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{
          top: "50%",
          left: "50%",
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  bgImage?: string;
}

const defaultImages: { [key: string]: string } = {
  "Project Management": "/img/project-management.jpg",
  "Portfolio Website": "/img/portfolio.jpg",
  "Gaisano University": "/img/gaisano.png",
  Sample: "/img/sample.jpg",
};

interface GreetingPageProps {
  greetings: string[];
  onComplete: () => void;
}

const GreetingPage = ({ greetings, onComplete }: GreetingPageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentIndexRef = useRef(currentIndex);
  const displayedTextRef = useRef(displayedText);
  const isDeletingRef = useRef(isDeleting);

  useEffect(() => { currentIndexRef.current = currentIndex; }, [currentIndex]);
  useEffect(() => { displayedTextRef.current = displayedText; }, [displayedText]);
  useEffect(() => { isDeletingRef.current = isDeleting; }, [isDeleting]);

  useEffect(() => {
    let timer: number;

    const tick = () => {
      if (currentIndexRef.current >= greetings.length) {
        onComplete();
        return;
      }

      const targetText = greetings[currentIndexRef.current];

      if (!isDeletingRef.current) {
        if (displayedTextRef.current.length < targetText.length) {
          setDisplayedText(targetText.substring(0, displayedTextRef.current.length + 1));
          timer = window.setTimeout(tick, 100);
        } else {
          timer = window.setTimeout(() => {
            setIsDeleting(true);
            tick();
          }, 200);
        }
      } else {
        if (displayedTextRef.current.length > 0) {
          setDisplayedText(targetText.substring(0, displayedTextRef.current.length - 1));
          timer = window.setTimeout(tick, 100);
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => prev + 1);
          timer = window.setTimeout(tick, 300);
        }
      }
    };

    timer = window.setTimeout(tick, 100);
    return () => window.clearTimeout(timer);
  }, [greetings, onComplete]);


  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-4xl sm:text-6xl font-bold text-white"
        >
          {displayedText}
          <span className="blinking-cursor">|</span>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const Portfolio = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);

  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const typingTimeout = useRef<number | null>(null);

  const projects: Project[] = [
    {
      title: "TaskFlow",
      description: "A simple task management web app.",
      tech: ["React", "TypeScript", "Tailwind", "Node.js", "Express"],
      link: "#",
      bgImage: "/img/taskflow.png",
    },
    {
      title: "Portfolio Website",
      description: "Modern responsive portfolio.",
      tech: ["React", "Tailwind"],
      link: "#",
      bgImage: "/img/portfolio.png",
    },
    {
      title: "Gaisano University",
      description: "Student Portal.",
      tech: ["React", "Tailwind"],
      link: "https://gaisano-university.vercel.app/",
      bgImage: "/img/gaisano.png",
    },
    {
      title: "Sample",
      description: "Sample project.",
      tech: ["React", "Tailwind"],
      link: "#",
    },
  ];


  useEffect(() => {
    const targetText = "Welcome to my portfolio!";
    const typeText = () => {
      const currentText = targetText.substring(0, charIndex);
      setDisplayText(currentText);
      if (!isDeleting) {
        if (charIndex < targetText.length) {
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        if (charIndex > 0) {
          setCharIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setTimeout(() => setCharIndex(1), 500);
          return;
        }
      }
      typingTimeout.current = window.setTimeout(typeText, isDeleting ? 50 : 100);
    };
    typingTimeout.current = window.setTimeout(typeText, 100);
    return () => {
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, [charIndex, isDeleting]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener("scroll", updateScrollProgress);
    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
      const homePos = homeRef.current?.getBoundingClientRect().top ?? 0;
      const aboutPos = aboutRef.current?.getBoundingClientRect().top ?? 0;
      const projectsPos = projectsRef.current?.getBoundingClientRect().top ?? 0;
      const contactPos = contactRef.current?.getBoundingClientRect().top ?? 0;
      if (homePos >= 0 && homePos < window.innerHeight) {
        setActiveSection("home");
      } else if (aboutPos < window.innerHeight / 2 && aboutPos > -window.innerHeight / 2) {
        setActiveSection("about");
      } else if (projectsPos < window.innerHeight / 2 && projectsPos > -window.innerHeight / 2) {
        setActiveSection("projects");
      } else if (contactPos < window.innerHeight / 2) {
        setActiveSection("contact");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    switch (section) {
      case "home":
        homeRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "about":
        aboutRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "projects":
        projectsRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        contactRef.current?.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  const sectionVariants = {
    initial: (direction: "up" | "down") => ({
      opacity: 0,
      y: direction === "down" ? 50 : -50,
    }),
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
    exit: { opacity: 0, scale: 0.8, y: -30, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button")) setCursorHovered(true);
      else setCursorHovered(false);
    };
    const handleMouseOut = () => setCursorHovered(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <AnimatePresence>
      {showGreeting ? (
        <GreetingPage
          greetings={["Bonjour", "Hola", "こんにちは", "안녕하세요", "Hello"]}
          onComplete={() => setShowGreeting(false)}
        />
      ) : (
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="min-h-screen"
        >
          <div className="min-h-screen bg-gray-950 text-gray-100">
            <header className="fixed top-0 w-full bg-gray-900 shadow-md z-50">
              <div className="h-1 bg-gray-800">
                <motion.div
                  className="h-full bg-slate-500"
                  animate={{ width: `${scrollProgress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-lg sm:text-xl font-extrabold tracking-widest bg-gradient-to-r from-slate-400 via-gray-500 to-slate-600 bg-clip-text text-transparent"
                >
                  KAIZEEL
                </motion.div>
                <div className="hidden md:flex space-x-8">
                  {["home", "about", "projects", "contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`capitalize transition-all duration-300 ease-in-out ${
                        activeSection === section
                          ? "text-slate-400 border-b-2 border-slate-500"
                          : "text-gray-300 hover:text-slate-300"
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-gray-300 hover:text-slate-300 focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              </nav>
              {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-lg">
                  {["home", "about", "projects", "contact"].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className={`w-full text-left px-6 py-3 ${
                        activeSection === section
                          ? "bg-slate-600 text-gray-100"
                          : "text-gray-300 hover:bg-gray-800"
                      }`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </header>

            <div className="space-y-0">
              <section
                ref={homeRef}
                className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-950 pt-16"
              >
                <motion.div
                  custom={scrollDirection}
                  variants={sectionVariants}
                  initial="initial"
                  animate="animate"
                  className="text-center space-y-4"
                >
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-widest text-gray-100">
                    {displayText}
                    <span className="typing-cursor text-slate-500">|</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-300 tracking-widest">
                    Scroll down to explore
                  </p>
                </motion.div>
              </section>

              <section
                ref={aboutRef}
                className="min-h-screen flex items-center justify-center bg-gray-950 pt-16"
              >
                <motion.div
                  custom={scrollDirection}
                  variants={sectionVariants}
                  initial="initial"
                  animate="animate"
                  className="container mx-auto px-4 sm:px-6 py-16"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-slate-400 tracking-widest">
                    About Me
                  </h2>
                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="flex flex-col justify-center">
                      <p className="text-base sm:text-lg text-gray-300 w-full text-justify m-0 p-0">
                        I'm an enthusiastic beginner developer driven by a passion for creating innovative software solutions. I enjoy diving into code and exploring the endless possibilities of software development, whether it's solving complex problems or building something entirely new.
                        <br /><br />
                        Currently, I'm focused on expanding my skills with the MERN stack—leveraging MongoDB, Express, React, and Node.js—to create scalable and interactive web applications. I'm also exploring MySQL to enhance my database management abilities, ensuring that my projects are dynamic, responsive, and efficient.
                      </p>
                      <a href="/path/to/sample_resume.pdf" download>
                        <FluidButton className="inline-flex items-center px-6 py-3 rounded-lg mt-6 mx-auto">
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Download Resume
                        </FluidButton>
                      </a>
                    </div>
                    <div className="flex justify-center items-center">
                      <motion.div
                        className="w-full flex justify-center"
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={imageVariants}
                      >
                        <div className="w-96 h-96 flex justify-center items-center rounded-lg shadow-2xl">
                          <img
                            src="/img/codingguy.png"
                            alt="Coding Guy"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </section>

              <section
                ref={projectsRef}
                className="min-h-screen flex items-center justify-center bg-gray-950 pt-16"
              >
                <motion.div
                  custom={scrollDirection}
                  variants={sectionVariants}
                  initial="initial"
                  animate="animate"
                  className="container mx-auto px-4 sm:px-6 py-16"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-slate-400 tracking-widest">
                    Projects
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => {
                      const imgSrc =
                        project.bgImage ||
                        defaultImages[project.title] ||
                        "/img/default.jpg";
                      return (
                        <a
                          key={project.title}
                          href={project.link !== "#" ? project.link : undefined}
                          target={project.link !== "#" ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <motion.div
                            className="bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={imgSrc}
                              alt={project.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="p-4">
                              <h3 className="text-xl font-bold mb-2 text-gray-100 tracking-widest">
                                {project.title}
                              </h3>
                              <p className="text-gray-300 mb-4 tracking-wide">
                                {project.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech) => (
                                  <FluidButton
                                    key={tech}
                                    onClick={() => {}}
                                    className="bg-slate-500 text-white px-3 py-1 rounded-full text-sm"
                                  >
                                    {tech}
                                  </FluidButton>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              </section>

              <section
                ref={contactRef}
                className="min-h-screen flex items-center justify-center bg-gray-950 pt-16"
              >
                <motion.div
                  custom={scrollDirection}
                  variants={sectionVariants}
                  initial="initial"
                  animate="animate"
                  className="container mx-auto px-4 sm:px-6 py-16"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-slate-400 text-center tracking-widest">
                    Get In Touch
                  </h2>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-gray-900 p-8 rounded-lg shadow-lg">
                      <h3 className="text-xl font-bold mb-4 text-gray-100">Contact Form</h3>
                      <form className="space-y-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400"
                        />
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400"
                        />
                        <textarea
                          placeholder="Your Message"
                          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-400 h-32"
                        />
                        <FluidButton className="w-full px-6 py-3 rounded-lg">
                          Send Message
                        </FluidButton>
                      </form>
                    </div>
                    <div className="flex-1 bg-gray-900 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
                      <h3 className="text-xl font-bold mb-4 text-gray-100 tracking-widest">
                        Let's Connect!
                      </h3>
                      <div className="flex gap-6">
                        <a
                          href="mailto:calbijul@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/img/email.png"
                            className="w-16 h-16 object-cover rounded-full border-4 border-transparent hover:border-gray-400 transition-colors"
                            alt="Email"
                          />
                        </a>
                        <a
                          href="https://www.linkedin.com/in/julham-calbi-458836328/?trk=PROFILE_DROP_DOWN"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/img/linkedin.png"
                            className="w-16 h-16 object-cover rounded-full border-4 border-transparent hover:border-gray-400 transition-colors"
                            alt="LinkedIn"
                          />
                        </a>
                        <a
                          href="https://github.com/calbijul"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/img/github.png"
                            className="w-16 h-16 object-cover rounded-full border-4 border-transparent hover:border-gray-400 transition-colors"
                            alt="GitHub"
                          />
                        </a>
                        <a
                          href="https://www.facebook.com/yourprofile"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src="/img/facebook.png"
                            className="w-16 h-16 object-cover rounded-full border-4 border-transparent hover:border-gray-400 transition-colors"
                            alt="Facebook"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>
            </div>
          </div>

          <motion.div
            className="fixed pointer-events-none rounded-full z-50"
            style={{
              width: 20,
              height: 20,
              top: 0,
              left: 0,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              x: cursorPos.x,
              y: cursorPos.y,
              backgroundColor: cursorHovered ? "#64748B" : "transparent",
              border: "2px solid #64748B",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Portfolio;
