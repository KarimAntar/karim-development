# 🤖 AI Agent Context Prompt — Karim Development Website

> Use this document to provide an AI agent with full context about the **Karim Development** portfolio website (`https://karims.dev`). This includes site structure, owner info, featured projects, services offered, and the complete contact system (API + form template).

---

## 🌐 Website Overview

- **Website URL**: https://karims.dev
- **Brand Name**: Karim Development
- **Type**: Personal portfolio / freelance developer website
- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Theme**: Dark mode by default (toggle available), with a matrix binary rain background animation, glassmorphism-style cards, and a blue gradient accent palette (`#0066e6`)

---

## 👤 About the Owner

- **Full Name**: Karim Antar (also known as Karim Mamdouh)
- **Title**: Full Stack Web Developer
- **Location**: Cairo, Egypt
- **Experience**: 8+ years
- **Projects Completed**: 50+
- **Technologies Mastered**: 10+

### Bio
Karim is a passionate web developer whose goal is to help organizations implement information technologies to meet their specialized and business objectives. He is experienced in React, Next.js, Node.js, TypeScript, Python, MongoDB, Firebase, and more. He is able to effectively self-manage during independent projects and collaborate within a productive team.

---

## 🗂️ Website Sections

The website is a single-page application (SPA) with the following anchor sections:

| Section ID   | Label     | Description                                               |
|--------------|-----------|-----------------------------------------------------------|
| `#home`      | Home      | Hero section with animated taglines and CTA buttons       |
| `#about`     | About     | Developer bio, experience stats, and tech overview        |
| `#services`  | Services  | Cards listing the main offered services                   |
| `#projects`  | Projects  | Featured project cards with live links                    |
| `#contact`   | Contact   | Contact form + social links + phone/location info         |

---

## ✨ Hero Taglines (Rotating, Typed Animation)

The homepage cycles through the following taglines with a typewriter effect (4-second rotation):

1. "Crafting Digital Excellence Through Innovation"
2. "Building Tomorrow's Web Solutions Today"
3. "Transforming Ideas Into Powerful Applications"
4. "Where Creativity Meets Technology"
5. "Engineering Excellence In Every Line Of Code"

---

## 🛠️ Services Offered

### 1. Web Development
Custom web applications built with modern technologies like **React**, **Next.js**, and **TypeScript** for optimal performance.

### 2. Mobile Solutions
Responsive and progressive web apps that work seamlessly across all devices and platforms.

### 3. API Development
**RESTful** and **GraphQL** APIs designed for scalability, security, and seamless integration.

---

## 🚀 Featured Projects

### 1. BloodBond
- **Description**: A comprehensive blood donation management platform connecting donors with those in need, featuring real-time matching and emergency alerts.
- **Tech Stack**: React, Node.js, MongoDB
- **Live URL**: https://bloodbond.app/

### 2. NS Financial Services
- **Description**: Professional financial services website offering comprehensive solutions for investment, loans, and financial planning.
- **Tech Stack**: Next.js, TypeScript, Tailwind CSS
- **Live URL**: https://www.nsfinancialservice.com/

### 3. Real Estate Platform
- **Description**: Modern real estate listings platform with advanced search, property management, and interactive map integration.
- **Tech Stack**: React, Firebase, Material-UI
- **Live URL**: https://real-estate-project-sepia.vercel.app/

---

## 📬 Contact Information

| Method       | Value                                              |
|--------------|----------------------------------------------------|
| 📧 Email      | karimamdou7@gmail.com                              |
| 📧 Site Email | info@karims.dev                                    |
| 📞 Phone      | +20 106 624 1997                                   |
| 📍 Location   | Cairo, Egypt                                       |
| 🐙 GitHub     | https://github.com/KarimAntar                      |
| 💼 LinkedIn   | https://www.linkedin.com/in/karimmamdouh           |
| 📘 Facebook   | https://facebook.com/Karim.Mamdou7                 |

---

## 📡 Contact API

### Endpoint
```
POST /api/contact
```

### Description
Accepts a JSON body and sends a branded HTML email to `info@karims.dev` via **Nodemailer** using **Resend SMTP** (configurable via environment variables).

### Request Body (JSON)
```json
{
  "name": "string (required)",
  "email": "string (required, valid email)",
  "message": "string (required)"
}
```

### Response — Success
```json
{
  "message": "Email sent successfully"
}
```
**HTTP Status**: `200 OK`

### Response — Validation Error (missing fields)
```json
{
  "message": "Missing required fields"
}
```
**HTTP Status**: `400 Bad Request`

### Response — Server Error
```json
{
  "message": "Failed to send email",
  "error": "Error details string"
}
```
**HTTP Status**: `500 Internal Server Error`

### Environment Variables Required
```env
SMTP_HOST=smtp.resend.com          # Default: smtp.resend.com
SMTP_PORT=465                      # Default: 465 (SSL/TLS)
SMTP_USER=resend                   # Default: resend
SMTP_PASS=<your_resend_api_key>    # OR use RESEND_API_KEY
RESEND_API_KEY=<your_api_key>      # Used as fallback for SMTP_PASS
SMTP_FROM=info@karims.dev          # Sender "From" address
CONTACT_EMAIL=info@karims.dev      # Recipient email address
```

---

## 📝 Contact Form — Frontend Template

This is the React/TSX contact form used on the site. You can use this as a reference or reuse it in other contexts:

```tsx
// State
const [formData, setFormData] = useState({ name: '', email: '', message: '' })
const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
const [submitMessage, setSubmitMessage] = useState('')

// Submit handler
const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setSubmitStatus('loading')

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (!response.ok) throw new Error('Failed to send message')

    setSubmitStatus('success')
    setSubmitMessage('Message sent successfully! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitStatus('idle'), 5000)
  } catch (error) {
    setSubmitStatus('error')
    setSubmitMessage('Failed to send message. Please try again later.')
  }
}

// JSX Form
<form onSubmit={handleContactSubmit} className="space-y-6">
  {/* Name Field */}
  <div>
    <label className="block text-gray-300 mb-2 font-medium">Name</label>
    <input
      type="text"
      required
      value={formData.name}
      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      placeholder="Your Name"
    />
  </div>

  {/* Email Field */}
  <div>
    <label className="block text-gray-300 mb-2 font-medium">Email</label>
    <input
      type="email"
      required
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      placeholder="your.email@example.com"
    />
  </div>

  {/* Message Field */}
  <div>
    <label className="block text-gray-300 mb-2 font-medium">Message</label>
    <textarea
      rows={5}
      required
      value={formData.message}
      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
      placeholder="Tell us about your project..."
    />
  </div>

  {/* Success / Error Feedback */}
  {submitStatus === 'success' && (
    <div className="success-message">{submitMessage}</div>
  )}
  {submitStatus === 'error' && (
    <div className="error-message">{submitMessage}</div>
  )}

  {/* Submit Button */}
  <button type="submit" disabled={submitStatus === 'loading'}>
    {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
  </button>
</form>
```

---

## 📧 Email Template Structure (HTML)

When a form is submitted, a branded HTML email is sent with:

- **Logo**: `https://karims.dev/logo_300x100_white.png`
- **Subject**: `New Contact Form Submission from {name}`
- **From**: `"{name}" <info@karims.dev>`
- **Reply-To**: The sender's email address
- **To**: `info@karims.dev`

The email body uses a dark-themed card design with:
- Header with logo + "New Message Received" subtitle
- Side-by-side **Sender Name** and **Email Address** fields
- Full **Message** body block
- Footer with link to `karims.dev` and send timestamp

---

## 🧠 Notes for AI Agent

- When a user mentions **Karim Development** or **karims.dev**, refer to this document for accurate details.
- The contact system uses **Resend** (SMTP gateway) — do NOT assume SendGrid or Mailgun.
- The site is built with **Next.js App Router** — API routes live under `app/api/`.
- The admin section (`/admin/login`) is a separate protected area not visible to public visitors.
- The form is **server-side validated** (all 3 fields required) and **client-side validated** (HTML5 `required` attributes).
- Email is sent using `nodemailer` with the **Resend SMTP** credentials.
- Default fallback email for both sender and recipient is `info@karims.dev`.
