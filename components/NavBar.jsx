import Link from 'next/link';


export default function NavBar() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Links */}
          <div className="flex items-center space-x-8">
            <Link href="/products" className="hover:bg-blue-500 hover:scale-105 px-3 py-2 rounded-md transition duration-300 ease-in-out">
              Products
            </Link>
            <Link href="/about" className="hover:bg-blue-500 hover:scale-105 px-3 py-2 rounded-md transition duration-300 ease-in-out">
              About Us
            </Link>
          </div>

          {/* Site Name in the Center */}
          <Link href="/" className="flex-shrink-0">
            <span className="font-bold text-2xl">MandoZA</span>
          </Link>

          {/* Right Links */}
          <div className="flex items-center space-x-8">
            <Link href="/contact" className="hover:bg-blue-500 hover:scale-105 px-3 py-2 rounded-md transition duration-300 ease-in-out">
              Contact
            </Link>
            <Link href="/login" className="hover:bg-blue-500 hover:scale-105 px-3 py-2 rounded-md transition duration-300 ease-in-out">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
