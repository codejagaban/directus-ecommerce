import ProductItem from "./product-item";
import { ProductTypes } from "@/types";

type ProductListProps = {
  products: ProductTypes[];
};
export default function ProductList({ products }: ProductListProps) {
  return (
    <div>
      {
        products.length > 0 ? products.map((product) => (
         <ProductItem {...product} key={product.id}  />
        )) : "No products found."
      }
    </div>
  );
}