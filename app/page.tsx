'use client'

import { useState, useEffect } from 'react'
import { FaCode, FaMobile, FaCloud, FaDatabase, FaRocket, FaEnvelope, FaGithub, FaLinkedin, FaTwitter, FaCheckCircle, FaServer, FaPalette } from 'react-icons/fa'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [scrollY, setScrollY] = useState(0)

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
      color: 'from-red-500 to-pink-500',
      live: 'https://bloodbond.app/'
    },
    {
      title: 'NS Financial Services',
      description: 'Professional financial services website offering comprehensive solutions for investment, loans, and financial planning.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      color: 'from-green-500 to-emerald-500',
      live: 'https://www.nsfinancialservice.com/'
    },
    {
      title: 'Real Estate Platform',
      description: 'Modern real estate listings platform with advanced search, property management, and interactive map integration.',
      tags: ['React', 'Firebase', 'Material-UI'],
      color: 'from-blue-500 to-cyan-500',
      live: 'https://real-estate-project-sepia.vercel.app/'
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-dark-800/98 shadow-lg shadow-primary-500/10' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">Karim Development</div>
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary-400'
                      : 'text-gray-300 hover:text-primary-400'
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="grid-pattern absolute inset-0 opacity-20"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="animate-slide-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/20">
                <img 
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop" 
                  alt="Workspace" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent"></div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="animate-slide-left text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gradient">Karim Development</span>
              </h1>
              <div className="text-xl md:text-2xl text-gray-300 mb-8 min-h-[80px]">
                <span className="typing-text">Crafting Digital Excellence Through Innovation</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#contact" className="btn-primary inline-block">
                  Get In Touch
                </a>
                <a href="#projects" className="px-8 py-3 border-2 border-primary-500 text-primary-400 rounded-lg font-semibold hover:bg-primary-500 hover:text-white transition-all">
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-primary-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">About Me</h2>
          <div className="max-w-4xl mx-auto">
            <div className="glow-card rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I'm <span className="text-primary-400 font-semibold">Karim Antar</span>, a passionate web developer based in Cairo, Egypt. My goal is to find positions where I can utilize my solid business experience and specialist information technology skills to assist organizations implementing information technologies to meet their specialized and business objectives.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                With experience as a Back-End Web Developer at Creatify and expertise in modern web technologies including React, Laravel, Node.js, and Python, I bring a comprehensive skill set to every project. I'm able to effectively self-manage during independent projects, as well as collaborate as part of a productive team.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                I hold a BSc in Architectural Engineering from Egyptian Russian University, which gives me a unique perspective on design, problem-solving, and creating efficient, beautiful solutions that satisfy human, social, and technological needs.
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
      <section id="services" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glow-card rounded-xl p-8 group"
                style={{
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s backwards`
                }}
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
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="glow-card rounded-xl p-8 group"
                style={{
                  animation: `slideLeft 0.5s ease-out ${index * 0.1}s backwards`
                }}
              >
                <div className={`w-full h-48 bg-gradient-to-br ${project.color} rounded-lg mb-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaCheckCircle className="text-6xl text-white opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
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
                    className="flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all font-semibold"
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
      <section id="contact" className="py-24 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gradient">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
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
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="flex justify-center gap-6">
                  <a href="https://github.com/KarimAntar" target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-400 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <FaGithub />
                  </a>
                  <a href="https://www.linkedin.com/in/karim-antar" target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-400 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <FaLinkedin />
                  </a>
                  <a href="https://facebook.com/karim.antar" target="_blank" rel="noopener noreferrer" className="text-3xl text-gray-400 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <FaTwitter />
                  </a>
                  <a href="mailto:karim_antar@icloud.com" className="text-3xl text-gray-400 hover:text-primary-400 transition-colors transform hover:scale-110">
                    <FaEnvelope />
                  </a>
                </div>
                <div className="text-center mt-6">
                  <p className="text-gray-400">Cairo, Egypt</p>
                  <a href="tel:+201066241997" className="text-primary-400 hover:text-primary-300">+20 106 624 1997</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; 2024 Karim Development. All rights reserved.</p>
          <p className="mt-2 text-sm">Building the future, one line of code at a time.</p>
        </div>
      </footer>
    </main>
  )
}
