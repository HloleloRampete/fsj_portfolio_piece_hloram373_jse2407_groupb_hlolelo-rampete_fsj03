import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "MandoZA E-commerce Store",
  description:
    "Find the best products at the best prices from this E-Commerce application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
      </body>
    </html>
  );
}
