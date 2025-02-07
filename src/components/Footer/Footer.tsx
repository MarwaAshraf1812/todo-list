import { Button } from '../ui/button';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Input } from '../ui/input';

function Footer() {
  return (
    <footer className="bg-white text-black py-10">
      <div className="container mx-auto px-6 lg:px-24 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">About</h3>
          <p className="text-sm">
            TodoApp helps you organize your tasks efficiently with seamless integrations.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Features</h3>
          <ul className="space-y-2">
            <li><Link href="/features" className="hover:text-gray-400">Task Management</Link></li>
            <li><Link href="/integrations" className="hover:text-gray-400">Integrations</Link></li>
            <li><Link href="/pricing" className="hover:text-gray-400">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><Link href="/help" className="hover:text-gray-400">Help Center</Link></li>
            <li><Link href="/contact" className="hover:text-gray-400">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-gray-400">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
          <form className="flex flex-col space-y-4">
            <Input
              type="email"
              placeholder="Your Email"
              className="p-2 rounded bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button type="submit" className="bg-lavender-600  text-white hover:bg-lavender-700">
              Subscribe
            </Button>
          </form>
          <div className="flex space-x-4 mt-6">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-400">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-blue-400">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} TodoApp. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
