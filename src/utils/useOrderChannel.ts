"use client";

import { useEffect } from "react";

export function useOrderChannel(
  orderId: number | null,
  onStatus: (status: any) => void,
  onPayment: (payment: any) => void
) {
  useEffect(() => {
    if (!orderId) return;

    const ws = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_WS_HOST}:6001/app/local?protocol=7&client=js&version=7.0.0&flash=false`
    );

    ws.onopen = () => {
      console.log("✅ WebSocket ochildi");
      ws.send(
        JSON.stringify({
          event: "pusher:subscribe",
          data: { channel: `order.${orderId}` },
        })
      );
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("📩 Yangi event:", msg);

      if (msg.event === "status.updated") {
        onStatus(msg.data);
      }

      if (msg.event === "payment.updated") {
        onPayment(msg.data);
      }
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket xato:", err);
    };

    return () => {
      ws.close();
    };
  }, [orderId, onStatus, onPayment]);
}
