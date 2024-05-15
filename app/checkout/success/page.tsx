"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SuccessMessage from "./message";

interface SuccessPageProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const { orderNo } = searchParams || {};
  const router = useRouter();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!orderNo) {
    router.push("/checkout");
    return null;
  }
  return isClient &&  (<SuccessMessage orderNo={orderNo as string} /> )
}
