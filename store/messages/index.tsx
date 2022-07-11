import { createContext, useContext, useEffect, useState } from "react";
import * as MessagesService from "../../services/messages/index";
import { useChats } from "../chats";
import { useSoket } from "../socket";
export type PropsMessageProvider = {
  children: React.ReactNode;
};
import { MessagesType } from "./type";
export const MessageContext = createContext({});
export const MessageProvider = ({ children }: PropsMessageProvider) => {
  const [loading, SetLoading] = useState<boolean>(false);
  const [newMessage, setNewMssage] = useState<any>();
  const [messages, setMessages] = useState<any | any[]>([]);
  const { socket } = useSoket();
  const { currentChat, chats, setCurrentChat } = useChats();
  const getMessages = async () => {
    SetLoading(true);
    try {
      setMessages([]);
      const messages = await MessagesService.getAll(currentChat._id);
      setMessages(messages);
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };
  const addMessage = ({ message }: any) => {
    setNewMssage(message);
  };
  useEffect(() => {
    if (newMessage && newMessage.chatId == currentChat._id) {
      setMessages((pre: any) => [...pre, newMessage]);
    }
  }, [newMessage]);
  useEffect(() => {
    socket.on("msgToClient", (re: any) => {
      addMessage(re);
    });
  }, []);

  useEffect(() => {
    if (currentChat && currentChat.isFoundChat) {
      getMessages();
    } else {
      setMessages([]);
    }
  }, [currentChat]);

  const value: MessagesType = {
    loading,
    messages,
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
export const useMessage = () => useContext(MessageContext) as MessagesType;
