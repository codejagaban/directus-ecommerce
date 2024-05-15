import directus from "./directus";
import { readItems, createItem, updateItems } from "@directus/sdk";

import { OrderTypes } from "@/types";

export const getAllProducts = async () => {
  try {
    const results = await directus.request(
      readItems("products", {
        filter: {
          is_available: {
            _eq: true,
          }
        }
      })
    );
    return results;
  }
  catch (error) {
    console.error("Error fetching products:", error);
    console.log(error);
  }
};

export const searchProducts = async (query: string) => {
  try {
    const results = await directus.request(
      readItems("products", {
        search: query,
        filter: {
          is_available: {
            _eq: true,
          }
        }
      })
    );
    return results;
  } catch (error) {
    console.error("Error searching for products:", error);
    console.log(error);
  }
};

export async function createOrder(orderData: OrderTypes) {
  try {
    const results = await directus.request(
      createItem("orders", { ...orderData })
    );
    console.log(results);
    await directus.request(updateItems("products", orderData.products, { is_available: false }))
    return `Order created successfully, Your order No is:  + ${results.order_no}`;

  } catch (error) {
    console.error("Error creating order:", error);
    console.log(error);
  }
}
