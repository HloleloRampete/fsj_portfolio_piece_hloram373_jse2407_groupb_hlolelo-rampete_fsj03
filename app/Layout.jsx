import "./globals.css";
import Navbar from "../components/Navbar";


/**
 * Metadata for the application.
 * @type {Object}
 */
export const metadata = {
  title: "MandoZA E-commerce Store",
  description:
    "Find the best products at the best prices from this E-Commerce application built with Next.js",
};

/**
 * Root layout component for the application.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout structure.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Navigation bar component */}
        <Navbar />
        <div className="flex-grow">
          {/* Main content area */}
          {children}
        </div>
        
      </body>
    </html>
  );
}
