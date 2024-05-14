
export type ProductTypes = {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  category: CategoryTypes[]
  is_available: boolean;
  order_id: OrderTypes
};
export type CategoryTypes = {
  name: string;
  description: string
}
 export type OrderTypes = {
  order_no: string;
  email: string;
  date: string;
  total_amount: string;
  first_name: string;
  last_name: string;
  shipping_address: string;
  products: number[];
  payment_id: string;
 };
