'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaPaperPlane, FaUserFriends, FaRegNewspaper, FaTag, FaSignOutAlt } from 'react-icons/fa'

export default function MailerDashboard() {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [successData, setSuccessData] = useState<any>(null)
  
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    template: 'newsletter',
    customMessage: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/admin/send-campaign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setSuccessData(data.data)
        setFormData({ ...formData, customMessage: '', to: '' })
        setTimeout(() => setStatus('idle'), 8000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to send campaign.')
        
        // If unauthorized, redirect to login
        if (res.status === 401) {
          router.push('/admin/login')
        }
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('A network error occurred.')
    }
  }

  const handleLogout = () => {
    // Basic logout by expiring the cookie
    document.cookie = "admin_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#050a0f] text-gray-300 font-sans selection:bg-[#0066e6]/30">
      
      {/* Top Navbar */}
      <header className="bg-[#0a1118] border-b border-[#0066e6]/20 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,102,230,0.1)]">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded bg-[#0066e6]/20 flex items-center justify-center border border-[#0066e6]/40">
            <FaPaperPlane className="text-[#0066e6]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">Campaign Matrix</h1>
            <p className="text-xs text-[#0066e6] uppercase tracking-widest font-semibold">Admin Panel</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a1118] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6">Compose Campaign</h2>
              
              <form onSubmit={handleSendCampaign} className="space-y-6">
                
                {/* To Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Recipients <span className="text-xs text-gray-500 font-normal">(comma-separated for multiple)</span>
                  </label>
                  <input
                    type="text"
                    name="to"
                    required
                    value={formData.to}
                    onChange={handleChange}
                    className="w-full bg-[#050a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#0066e6] focus:ring-1 focus:ring-[#0066e6] transition-all outline-none"
                    placeholder="client1@example.com, client2@example.com"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-[#050a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#0066e6] focus:ring-1 focus:ring-[#0066e6] transition-all outline-none"
                    placeholder="Exclusive Update for You"
                  />
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email Template
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <label className={`relative flex flex-col items-center p-4 cursor-pointer rounded-xl border-2 transition-all ${formData.template === 'welcome' ? 'border-[#0066e6] bg-[#0066e6]/10' : 'border-white/10 bg-[#050a0f] hover:border-white/30'}`}>
                      <input type="radio" name="template" value="welcome" checked={formData.template === 'welcome'} onChange={handleChange} className="sr-only" />
                      <FaUserFriends className={`text-2xl mb-2 ${formData.template === 'welcome' ? 'text-[#0066e6]' : 'text-gray-500'}`} />
                      <span className={`text-sm font-medium ${formData.template === 'welcome' ? 'text-white' : 'text-gray-400'}`}>Welcome</span>
                    </label>

                    <label className={`relative flex flex-col items-center p-4 cursor-pointer rounded-xl border-2 transition-all ${formData.template === 'newsletter' ? 'border-[#0066e6] bg-[#0066e6]/10' : 'border-white/10 bg-[#050a0f] hover:border-white/30'}`}>
                      <input type="radio" name="template" value="newsletter" checked={formData.template === 'newsletter'} onChange={handleChange} className="sr-only" />
                      <FaRegNewspaper className={`text-2xl mb-2 ${formData.template === 'newsletter' ? 'text-[#0066e6]' : 'text-gray-500'}`} />
                      <span className={`text-sm font-medium ${formData.template === 'newsletter' ? 'text-white' : 'text-gray-400'}`}>Newsletter</span>
                    </label>

                    <label className={`relative flex flex-col items-center p-4 cursor-pointer rounded-xl border-2 transition-all ${formData.template === 'promotion' ? 'border-yellow-500 bg-yellow-500/10' : 'border-white/10 bg-[#050a0f] hover:border-white/30'}`}>
                      <input type="radio" name="template" value="promotion" checked={formData.template === 'promotion'} onChange={handleChange} className="sr-only" />
                      <FaTag className={`text-2xl mb-2 ${formData.template === 'promotion' ? 'text-yellow-500' : 'text-gray-500'}`} />
                      <span className={`text-sm font-medium ${formData.template === 'promotion' ? 'text-white' : 'text-gray-400'}`}>Promotion</span>
                    </label>

                  </div>
                </div>

                {/* Custom Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message Content
                  </label>
                  <textarea
                    name="customMessage"
                    required
                    rows={8}
                    value={formData.customMessage}
                    onChange={handleChange}
                    className="w-full bg-[#050a0f] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#0066e6] focus:ring-1 focus:ring-[#0066e6] transition-all outline-none resize-y"
                    placeholder="Type the body of your email here..."
                  ></textarea>
                </div>

                {/* Alerts */}
                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-3">
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 flex items-start gap-3">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div>
                      <p className="font-semibold block mb-1">Campaign Deployed Successfully!</p>
                      {successData?.id && (
                        <p className="text-sm font-mono opacity-80 break-all">Resend ID: {successData.id}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-3 group relative overflow-hidden"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Deploying Campaign...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        Send Campaign
                      </span>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Right Column: Tips / Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0a1118] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Pro Tips
              </h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066e6] mt-1.5 flex-shrink-0"></div>
                  <p>For multiple recipients, simply separate emails with commas (e.g., <code className="text-[#0066e6]">a@test.com, b@test.com</code>).</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066e6] mt-1.5 flex-shrink-0"></div>
                  <p>Open rates and link tracking metrics are automatically collected in your <a href="https://resend.com/emails" target="_blank" className="text-white underline hover:text-[#0066e6]">Resend Dashboard</a>.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0066e6] mt-1.5 flex-shrink-0"></div>
                  <p>The <span className="text-yellow-500 font-semibold">Promotion</span> template automatically includes a glowing gold border and CTA button.</p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
