"use client";
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logo.png';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path:string) => pathname === path;

  return (
    <header className="flex justify-between items-center p-4 lg:px-24 md:px-20 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
      <div className="flex items-center">
        <Image src={logo} alt="Logo" width={40} height={40} className="h-10" />
        <Link href={'/'}>
          <span className="text-2xl font-bold">TodoApp</span>
        </Link>
      </div>

      <button
        className="md:hidden text-white"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </button>

      <nav className="hidden md:flex space-x-6">
        <Link
          href="/"
          className={`text-lg transition-colors ${
            isActive('/') ? 'text-yellow-400' : 'hover:text-gray-300'
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`text-lg transition-colors ${
            isActive('/about') ? 'text-yellow-400' : 'hover:text-gray-300'
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`text-lg transition-colors ${
            isActive('/contact') ? 'text-yellow-400' : 'hover:text-gray-300'
          }`}
        >
          Contact
        </Link>
      </nav>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full  text-white md:hidden">
          <div className="flex flex-col items-center space-y-4 py-6">
            <Link
              href="/"
              className={`text-lg ${
                isActive('/') ? 'text-yellow-400' : 'hover:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-lg ${
                isActive('/about') ? 'text-yellow-400' : 'hover:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-lg ${
                isActive('/contact') ? 'text-yellow-400' : 'hover:text-gray-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton>
            <Button variant="outline" className="text-gray-900 hover:bg-gray-300">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Navbar;
