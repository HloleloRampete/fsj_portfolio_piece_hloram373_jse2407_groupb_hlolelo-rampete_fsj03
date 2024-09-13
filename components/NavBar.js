import Link from 'next/link'

export default function NavBar() {
    return(
        <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="font-bold text-xl">MandoZA</span>
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="hover:bg-gray-700 px-3 py-2 rounded-md">Home</Link>
              <Link href="/products" className="hover:bg-gray-700 px-3 py-2 rounded-md">Products</Link>
              <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md">About Us</Link>
              <Link href="/contact" className="hover:bg-gray-700 px-3 py-2 rounded-md">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
}