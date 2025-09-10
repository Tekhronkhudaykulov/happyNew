import { useEffect } from "react";
import { socket } from "./socketClient";
import { SOCKET_EVENTS } from "./socketEvents";

type EventHandlers = {
  onOrderData?: (data: any) => void;
  onOrderUpdated?: (data: any) => void;
  onDisconnect?: (reason: string) => void;
  onConnect?: (socketId: any) => void;
};

export const useOrderSocket = ({
  onOrderData,
  onOrderUpdated,
  onDisconnect,
  onConnect,
}: EventHandlers) => {
  useEffect(() => {
    if (!socket.connected) socket.connect();

    socket.on("connect", () => {
      console.log("✅ Ulandi:", socket.id);
      onConnect?.(socket?.id);
    });

    if (onOrderData) {
      socket.on(SOCKET_EVENTS.ORDER_DATA, onOrderData);
    }

    if (onOrderUpdated) {
      socket.on(SOCKET_EVENTS.ORDER_UPDATED, onOrderUpdated);
    }

    socket.on("disconnect", (reason) => {
      console.log("❌ Uzildi:", reason);
      onDisconnect?.(reason);
    });

    return () => {
      socket.off(SOCKET_EVENTS.ORDER_DATA, onOrderData!);
      socket.off(SOCKET_EVENTS.ORDER_UPDATED, onOrderUpdated!);
      socket.off("disconnect", onDisconnect!);
    };
  }, [onOrderData, onOrderUpdated, onDisconnect, onConnect]);
};
