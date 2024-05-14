import ProductList from "@/components/product-list";
import { searchProducts } from "@/lib/apis";
export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { query } = searchParams as { [key: string]: string };
  const products =  await searchProducts(query) || [];


  return (
    <section>
      <h1>Search Page For Products</h1>
      <p>Showing results for {query}</p>
      <ProductList products={products} />
    </section>
  );
}
