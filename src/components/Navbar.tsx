'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { User as UserIcon, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const { user, loading } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        setIsOpen(false)
        router.refresh()
    }

    // Helper to get initials or placeholder
    const getInitials = () => {
        if (user?.user_metadata?.full_name) {
            return user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
        }
        return user?.email?.[0].toUpperCase() || 'U'
    }

    return (
        <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center bg-white/10 dark:bg-black/10 backdrop-blur-md">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    B
                </div>
                <span className="text-2xl font-bold tracking-tight">BizLaunch</span>
            </div>
            <div className="hidden md:flex gap-8 items-center text-sm font-medium">
                <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
                <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
                <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>

                {!loading && !user && (
                    <>
                        <Link href="/login" className="px-5 py-2 rounded-full border border-primary/20 hover:bg-primary/5 transition-all">
                            Login
                        </Link>
                        <Link href="/signup" className="px-5 py-2 rounded-full gradient-bg text-white shadow-xl hover:opacity-90 transition-all">
                            Get Started
                        </Link>
                    </>
                )}

                {!loading && user && (
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/5 transition-all focus:outline-none"
                        >
                            <div className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden flex items-center justify-center bg-white/5">
                                {user.user_metadata?.avatar_url ? (
                                    <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full bg-primary/10 text-primary font-bold text-xs">
                                        {user.user_metadata?.full_name || user.email ? (
                                            getInitials()
                                        ) : (
                                            <UserIcon className="w-5 h-5" />
                                        )}
                                    </div>
                                )}
                            </div>
                            <ChevronDown className={`w-4 h-4 text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl shadow-xl overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-4 py-3 border-b border-glass-border">
                                    <p className="text-sm font-bold truncate text-foreground">
                                        {user.user_metadata?.full_name || user.user_metadata?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-secondary truncate">
                                        {user.email}
                                    </p>
                                </div>

                                <div className="py-1">
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/dashboard/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <UserIcon className="w-4 h-4" />
                                        Profile
                                    </Link>
                                </div>

                                <div className="border-t border-glass-border py-1">
                                    <button
                                        onClick={handleSignOut}
                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}
