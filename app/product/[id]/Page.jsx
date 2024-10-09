import { Suspense } from "react";
import { getProduct } from "../../../lib/api";
import ProductDetails from "../../../components/ProductDetails";
import ReviewList from "../../../components/Reviews";
import Loading from "../[id]/loading";
import BackButton from "../../../components/BackButton";

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [
        { url: product.images[0], width: 800, height: 600, alt: product.title },
      ],
    },
  };
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) return <div>No product found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <Suspense fallback={<Loading />}>
        <ProductDetails product={product} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ReviewList reviews={product.reviews || []} />
      </Suspense>
    </div>
  );
}
