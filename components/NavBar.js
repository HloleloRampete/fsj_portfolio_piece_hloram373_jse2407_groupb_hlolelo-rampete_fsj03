import Link from 'next/link';

export default function NavBar() {
    return (
        <nav className="bg-blue-600 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center h-16">
                    <div className="flex items-center space-x-10">
                        <Link href="/" className="flex-shrink-0">
                            <span className="font-bold text-2xl">MandoZA</span>
                        </Link>
                        <div className="flex items-baseline space-x-8">
                            <Link href="/" className="hover:bg-blue-500 px-3 py-2 rounded-md transition duration-300 ease-in-out">Home</Link>
                            <Link href="/products" className="hover:bg-blue-500 px-3 py-2 rounded-md transition duration-300 ease-in-out">Products</Link>
                            <Link href="/about" className="hover:bg-blue-500 px-3 py-2 rounded-md transition duration-300 ease-in-out">About Us</Link>
                            <Link href="/contact" className="hover:bg-blue-500 px-3 py-2 rounded-md transition duration-300 ease-in-out">Contact</Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
