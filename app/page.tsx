import ProductList from "@/components/product-list";
import { getAllProducts } from "@/lib/apis";

export default async function Home() {
  const products =  await getAllProducts() || [];
  return (
    <section>
      <h1>Hello and Welcome to Directus + Next.js E-commerce</h1>
      <p>Find amazing items for your purchase</p>
        <ProductList products={products} />
      </section>
  );
}
