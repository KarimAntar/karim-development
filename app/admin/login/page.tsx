'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FaLock, FaArrowRight } from 'react-icons/fa'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin/mailer')
      } else {
        const data = await res.json()
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050a0f] flex flex-col justify-center items-center p-4">
      
      <div className="w-full max-w-md glow-card bg-[#0a1118] border border-[#0066e6]/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,102,230,0.15)] relative overflow-hidden">
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0066e6] to-transparent"></div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0066e6]/10 border border-[#0066e6]/30 mb-4 shadow-[0_0_15px_rgba(0,102,230,0.3)]">
            <FaLock className="text-2xl text-[#0066e6]" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400 text-sm">Enter your secure credentials to access the campaign manager.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-[#050a0f] border border-[#0066e6]/30 rounded-lg focus:border-[#0066e6] focus:ring-1 focus:ring-[#0066e6] focus:outline-none text-white placeholder-gray-600 transition-all font-mono"
              placeholder="••••••••••••"
            />
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                Access Dashboard
                <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <a href="/" className="text-sm text-[#0066e6] hover:text-[#3b82f6] transition-colors">
            ← Return to Karim Development
          </a>
        </div>
      </div>
    </div>
  )
}
