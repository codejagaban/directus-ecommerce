import { ProductTypes } from "@/types";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import generateOrderNum from "@/utils/generateOrderNum";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type RequestData = {
  first_name: string,
  last_name: string,
  email: string,
  total_amount: number,
  address: string,
  products: ProductTypes[]
  shipping_address: string,
};
export async function POST(req: Request) {
  const {
    first_name,
    last_name,
    email,
    total_amount,
    shipping_address,
    products
  }: RequestData = await req.json();

  const order_no = generateOrderNum();

  const line_items = products.map(product => ({
    quantity: 1,
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        description: product.description,
      },
      unit_amount: product.price * 100, // Stripe expects prices in cents
    },
  }));

  try {
    console.log(order_no)

    const stripeSession = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.APP_URL}/checkout/success?orderNo=${order_no}`,
      cancel_url: `${process.env.APP_URL}/checkout/shipping`,
      metadata: {
        total_amount: total_amount * 100, // Stripe expects prices in cents
        first_name,
        last_name,
        email,
        date: new Date().toISOString(),
        products: JSON.stringify(products.map(product => (product.id))),
        shipping_address,
        order_no,
      },
    });

    console.log(stripeSession);
    return NextResponse.json({ url: stripeSession.url! });
  } catch (err) {
    console.log({ err });
    return NextResponse.json(
      { message: "An expected error occurred, please try again" },
      { status: 500 }
    );
  }
}