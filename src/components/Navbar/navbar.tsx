import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ListTodo } from 'lucide-react';

function Navbar() {

  return (
    <header className="flex justify-between items-center p-4 lg:px-24 md:px-20">
      <div className="flex items-center">
        <ListTodo className="h-8 w-8 text-lavender-600" />
        <Link href={'/'}>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lavender-600 to-lavender-400">TaskFlow</span>
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton>
            <Button variant="outline" className="hover:bg-lavender-500/10 hover:text-lavender-600 transition-colors duration-300">
              Login
            </Button>
          </SignInButton>
          <SignUpButton>
            <Button variant="outline"  className="text-white bg-lavender-600 hover:bg-lavender-700 shadow-lg hover:shadow-lavender-500/25 transition-all duration-300">
              Sign Up
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}

export default Navbar;
