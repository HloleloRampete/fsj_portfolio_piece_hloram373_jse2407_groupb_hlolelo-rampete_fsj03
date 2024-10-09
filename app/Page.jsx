import ProductGrid from "../components/ProductGrid";
import { Suspense } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export const metadata = {
  title: "MandoZA | SA's online store",
  description:
    "Discover a wide range of products at MandoZA.",
};

export default function Home() {
  return (
    // Main content area with styling for minimum height, padding, and background
    <main className="min-h-screen px-4 bg-gray-100 text-gray-900 transition-colors duration-300">
      <div className="container mx-auto py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <ProductGrid />
        </Suspense>
      </div>
    </main>
  );
}
