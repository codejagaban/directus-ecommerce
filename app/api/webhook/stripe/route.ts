import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createOrder } from "@/lib/apis";

const checkout_session_completed = "checkout.session.completed";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request, res: Response) {
  const reqBody = await req.text();
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: `Webhook Error: ${error.message}` },
      { status: 500 }
    );
  }

  // load our event
  switch (event.type) {
    case checkout_session_completed:
      const session = event.data.object;
      if (!session.metadata || !session.payment_intent) {
        console.error("Missing metadata or Payment Intent in Stripe session");
        // Optionally return an error response
        return NextResponse.json(
          { message: "Incomplete order data" },
          { status: 400 }
        );
      }

      const {
        // @ts-ignore
        metadata: {
          total_amount,
          first_name,
          last_name,
          shipping_address,
          email,
          products,
          date,
          order_no,
        },
        payment_intent,
      } = session;
      console.log({ payment_intent });
      await createOrder({
        total_amount,
        first_name,
        last_name,
        shipping_address,
        email,
        products: JSON.parse(products),
        payment_id: payment_intent as string,
        order_no,
        date: date
      });

      return NextResponse.json("Booking successful", {
        status: 200,
        statusText: "Booking Successful",
      });

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

    return NextResponse.json({ message: "Event Received" }, { status: 200 });
  }
