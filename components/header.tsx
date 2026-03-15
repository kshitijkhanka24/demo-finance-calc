'use client';

import { Menu, Search, LogIn } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="backdrop-blur-md bg-white/30 border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">Finance</span>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Calculators
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Investment
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Loans
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              More
            </a>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/40 border border-white/20">
              <Search size={18} className="text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm placeholder-muted-foreground focus:outline-none w-32"
              />
            </div>

            {/* Login */}
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-primary font-medium hover:bg-primary/10 transition-colors">
              <LogIn size={18} />
              <span>Login</span>
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <Menu size={20} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-white/20 rounded-lg transition-colors">
              Calculators
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-white/20 rounded-lg transition-colors">
              Investment
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-white/20 rounded-lg transition-colors">
              Loans
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:bg-white/20 rounded-lg transition-colors">
              More
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
