'use client'

import { useState, useEffect } from 'react'
import { FaCode, FaMobile, FaCloud, FaDatabase, FaRocket, FaEnvelope, FaGithub, FaLinkedin, FaFacebook, FaCheckCircle, FaServer, FaPalette, FaSun, FaMoon, FaHome, FaUser, FaBriefcase, FaFolderOpen, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)
  const [darkMode, setDarkMode] = useState(true)
  const [currentTagline, setCurrentTagline] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const taglines = [
    "Crafting Digital Excellence Through Innovation",
    "Building Tomorrow's Web Solutions Today",
    "Transforming Ideas Into Powerful Applications",
    "Where Creativity Meets Technology",
    "Engineering Excellence In Every Line Of Code"
  ]

  const navItems = [
    { name: 'Home', icon: FaHome },
    { name: 'About', icon: FaUser },
    { name: 'Services', icon: FaBriefcase },
    { name: 'Projects', icon: FaFolderOpen },
    { name: 'Contact', icon: FaEnvelope }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      const sections = ['home', 'about', 'services', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Typing animation effect
  useEffect(() => {
    setDisplayedText('')
    setIsTyping(true)
    let currentIndex = 0
    const currentText = taglines[currentTagline]

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setDisplayedText(currentText.slice(0, currentIndex))
        currentIndex++
      } else {
        setIsTyping(false)
        clearInterval(typingInterval)
      }
    }, 50) // Typing speed: 50ms per character

    return () => clearInterval(typingInterval)
  }, [currentTagline])

  // Rotate taglines every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all animatable elements
    const elements = document.querySelectorAll('.scroll-animate')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Matrix rain animation
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const binary = '01'
    const fontSize = 16
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize)
    }

    const draw = () => {
      // Semi-transparent background for trail effect
      const bgColor = darkMode ? 'rgba(5, 10, 15, 0.05)' : 'rgba(230, 241, 255, 0.05)'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text color based on theme
      const textColor = darkMode ? '#0066e6' : '#0052b8'
      ctx.fillStyle = textColor
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = binary[Math.floor(Math.random() * binary.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(text, x, y)

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [darkMode])

  const services = [
    {
      icon: <FaCode className="text-4xl" />,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Next.js, and TypeScript for optimal performance.'
    },
    {
      icon: <FaMobile className="text-4xl" />,
      title: 'Mobile Solutions',
      description: 'Responsive and progressive web apps that work seamlessly across all devices and platforms.'
    },
    {
      icon: <FaServer className="text-4xl" />,
      title: 'API Development',
      description: 'RESTful and GraphQL APIs designed for scalability, security, and seamless integration.'
    }
  ]

  const projects = [
    {
      title: 'BloodBond',
      description: 'A comprehensive blood donation management platform connecting donors with those in need, featuring real-time matching and emergency alerts.',
      tags: ['React', 'Node.js', 'MongoDB'],
      image: '/bloodbond.png',
      live: 'https://bloodbond.app/'
    },
    {
      title: 'NS Financial Services',
      description: 'Professional financial services website offering comprehensive solutions for investment, loans, and financial planning.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      image: '/nsfinancialservice.png',
      live: 'https://www.nsfinancialservice.com/'
    },
    {
      title: 'Real Estate Platform',
      description: 'Modern real estate listings platform with advanced search, property management, and interactive map integration.',
      tags: ['React', 'Firebase', 'Material-UI'],
      image: '/realestate.png',
      live: 'https://real-estate-project-sepia.vercel.app/'
    }
  ]

  return (
    <main className="min-h-screen relative">
      {/* Matrix Rain Background */}
      <canvas
        id="matrix-canvas"
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-dark-800/98 dark:bg-dark-800/98 shadow-lg shadow-primary-500/10' : 'bg-dark-900/80 dark:bg-dark-900/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center gap-2 sm:gap-3 shrink-0 cursor-pointer" onClick={() => setMobileMenuOpen(false)}>
              <div className="logo-container-header shrink-0">
                <img
                  src="/logo160x160.png"
                  alt="Karim Development Logo"
                  className="logo-header"
                />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gradient whitespace-nowrap shrink-0">Karim Development</span>
            </a>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="hidden md:flex space-x-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      href={`#${item.name.toLowerCase()}`}
                      className={`nav-item ${
                        activeSection === item.name.toLowerCase()
                          ? 'nav-item-active'
                          : ''
                      }`}
                    >
                      <Icon className="text-base" />
                      <span>{item.name}</span>
                    </a>
                  )
                })}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-300 hover:text-primary-400 transition-colors p-2 relative z-50"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Dark/Light Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="relative w-16 h-8 bg-gray-400 dark:bg-dark-700 rounded-full transition-colors duration-300 border-2 border-gray-500 dark:border-transparent flex items-center p-[2px] shrink-0"
                aria-label="Toggle dark mode"
              >
                <div
                  className={`w-7 h-7 bg-gray-100 dark:bg-dark-900 rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
                    darkMode ? 'translate-x-8' : 'translate-x-0'
                  }`}
                >
                  {darkMode ? (
                    <FaMoon className="text-primary-400 text-sm" />
                  ) : (
                    <FaSun className="text-yellow-600 text-sm" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-800/98 dark:bg-dark-800/98 border-t border-gray-700 relative z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      href={`#${item.name.toLowerCase()}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`nav-item-mobile ${
                        activeSection === item.name.toLowerCase()
                          ? 'nav-item-mobile-active'
                          : ''
                      }`}
                    >
                      <Icon className="text-lg" />
                      <span>{item.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left side - Image */}
            <div className="animate-slide-right">
              <div className="relative hero-image-container">
                <img
                  src="https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&h=800&w=687"
                  alt="Workspace"
                  className="w-full h-auto object-cover hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="animate-slide-left text-center md:text-left max-w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 max-w-full overflow-hidden">
                <span className="text-gradient">Karim Development</span>
              </h1>
              <div className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 min-h-[70px] sm:min-h-[80px] w-full">
                <span className="typing-text-wrapper">
                  {displayedText}
                  <span className={`typing-cursor ${isTyping ? 'blink' : ''}`}>|</span>
                </span>
              </div>
              <div className="hero-buttons-container max-w-full">
                <a href="#contact" className="btn-primary text-center">
                  Get In Touch
                </a>
                <a href="#projects" className="btn-secondary text-center">
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-indicator-mouse">
            <div className="scroll-indicator-dot"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 md:py-24 relative scroll-animate z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 scroll-animate">
            <span className="text-gradient">About Me</span>
          </h2>
          <div className="max-w-4xl mx-auto scroll-animate">
            <div className="glow-card rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm <span className="text-primary-400 font-semibold">Karim Antar</span>, a passionate web developer based in Cairo, Egypt. My goal is to find positions where I can utilize my solid business experience and specialist information technology skills to assist organizations implementing information technologies to meet their specialized and business objectives.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                With experience as a Full Stack Web Developer and expertise in modern web technologies including React, Node.js, and Python, I bring a comprehensive skill set to every project. I'm able to effectively self-manage during independent projects, as well as collaborate as part of a productive team.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-dark-700/50 rounded-xl border border-primary-500/20">
                  <div className="text-4xl font-bold text-primary-400 mb-2">8+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-dark-700/50 rounded-xl border border-primary-500/20">
                  <div className="text-4xl font-bold text-primary-400 mb-2">50+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-dark-700/50 rounded-xl border border-primary-500/20">
                  <div className="text-4xl font-bold text-primary-400 mb-2">10+</div>
                  <div className="text-gray-400">Technologies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 md:py-24 relative scroll-animate z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 scroll-animate">
            <span className="text-gradient">Our Services</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glow-card rounded-xl p-8 group scroll-animate"
              >
                <div className="text-primary-400 mb-4 transform group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 md:py-24 relative scroll-animate z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 scroll-animate">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glow-card rounded-xl p-8 group scroll-animate flex flex-col"
              >
                <div className="w-full h-48 rounded-lg mb-6 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm border border-primary-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-action flex items-center justify-center gap-2"
                  >
                    <FaRocket /> Live
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 md:py-24 relative scroll-animate z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12 md:mb-16 scroll-animate">
            <span className="text-gradient">Get In Touch</span>
          </h2>
          <div className="max-w-2xl mx-auto scroll-animate">
            <div className="glow-card rounded-2xl p-8 md:p-12">
              <form className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-dark-700 border border-primary-500/30 rounded-lg focus:border-primary-500 focus:outline-none text-white placeholder-gray-500 transition-all"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-dark-700 border border-primary-500/30 rounded-lg focus:border-primary-500 focus:outline-none text-white placeholder-gray-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 font-medium">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-dark-700 border border-primary-500/30 rounded-lg focus:border-primary-500 focus:outline-none text-white placeholder-gray-500 transition-all resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="btn-primary">
                    Send Message
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex justify-center gap-4">
                  <a href="https://github.com/KarimAntar" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/karimmamdouh" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedin />
                  </a>
                  <a href="https://facebook.com/Karim.Mamdou7" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaFacebook />
                  </a>
                  <a href="mailto:karimamdou7@gmail.com" className="social-icon">
                    <FaEnvelope />
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
                  <div className="contact-info-badge">
                    <FaMapMarkerAlt className="text-primary-400 text-lg flex-shrink-0" />
                    <span>Cairo, Egypt</span>
                  </div>
                  <a
                    href="tel:+201066241997"
                    className="contact-info-badge contact-info-link group"
                  >
                    <FaPhone className="text-primary-400 text-lg flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-primary-400 transition-colors">+20 106 624 1997</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-10 md:py-12 border-t border-gray-800 dark:border-gray-800 border-gray-300 relative z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <div className="logo-container-footer mb-6">
              <img
                src={darkMode ? "/logo_300x100_white.png" : "/logo_300x100_black.png"}
                alt="Karim Development Logo"
                className="logo-footer"
              />
            </div>
            <div className="text-center text-gray-400 dark:text-gray-400 text-gray-600">
              <p>&copy; 2026 Karim Development. All rights reserved.</p>
              <p className="mt-2 text-sm">Building the future, one line of code at a time.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
