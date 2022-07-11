import React, { createContext, useContext, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import useStorage from "../../helpers/hooks/useStorage";
import { SocketType } from "./type";
export const SocketContext = createContext({});
export const SocketProvider = ({ children }: any) => {
  const { getItem } = useStorage();
  const token = getItem("token", "local");
  const socket = useRef(
    socketIOClient(`${process.env.NEXT_PUBLIC_BASE_URL}`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: "Bearer " + token,
          },
        },
      },
    })
  );
  useEffect(() => {
    socket.current.on("connect", () => {
      console.log("SocketIO: Connected and authenticated");
    });
    socket.current.on("error", (msg: string) => {
      console.error("SocketIO: Error", msg);
    });
    return () => {
      if (socket && socket.current) {
        socket.current.removeAllListeners();
        socket.current.close();
      }
    };
  }, []);
  return (
    <SocketContext.Provider value={{ socket: socket.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSoket = () => useContext(SocketContext) as SocketType;
