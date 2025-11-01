# Karim Development - Portfolio Website

A modern, professional portfolio website built with Next.js 14, featuring dark blue styling, smooth animations, and interactive effects.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 14, React, TypeScript, and Tailwind CSS
- **Theme Switcher**: Toggle between dark and light themes with a smooth animated switch
- **Smooth Animations**: CSS animations and transitions throughout
- **Responsive Design**: Fully responsive across all devices
- **Interactive Effects**:
  - Glowing cards on hover
  - Floating particles
  - Animated skill bars
  - Smooth scroll navigation
  - Gradient text effects
  - Custom scrollbar
- **Sections**:
  - Hero with animated elements
  - About with statistics
  - Services showcase
  - Featured projects
  - Technical skills with progress bars
  - Contact form
  - Social media links

## 📁 Project Structure

```
karim-development/
├── app/
│   ├── globals.css       # Global styles and animations
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main homepage component
├── public/               # Static assets (add your images here)
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: { ... },  // Blue colors
  dark: { ... }      // Dark background colors
}
```

### Content
Edit `app/page.tsx` to update:
- Hero text and tagline
- Services offered
- Project portfolio
- Skills and experience levels
- Contact information
- Social media links

### Animations
Customize animations in `app/globals.css`:
- Adjust animation durations
- Modify keyframes
- Change particle effects
- Update glow intensities

## 🎯 Key Components

### Navigation
- Smooth scroll to sections
- Active section highlighting
- Background blur on scroll

### Hero Section
- Animated text entrance
- Floating rocket icon
- Particle background effect
- Call-to-action buttons

### Services Cards
- 6 service offerings
- Hover glow effects
- Staggered animations
- Icon integration

### Projects Showcase
- 4 featured projects
- Gradient thumbnails
- Tag system
- Hover interactions

### Skills Display
- Animated progress bars
- Technology icons
- Percentage indicators
- Staggered reveals

### Contact Form
- Input validation ready
- Hover effects
- Social media links
- Responsive layout

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment

Deploy easily to:
- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repo
- **AWS/Azure**: Use Docker container

## 🔧 Technologies Used

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- React Icons
- Framer Motion (optional enhancement)

## 📝 License

This project is open source and available for customization.

## 🤝 Support

For questions or customization requests, reach out through the contact form on the website.

---

**Built with ❤️ by Karim Development**
