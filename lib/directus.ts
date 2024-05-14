import { createDirectus, rest } from "@directus/sdk";
import { CategoryTypes, OrderTypes, ProductTypes } from "@/types"


type Schema = {
  products: ProductTypes[];
  categories: CategoryTypes[];
  orders: OrderTypes[];
};

const directus = createDirectus<Schema>(
  process.env.DIRECTUS_URL as string
).with(rest());

export default directus;