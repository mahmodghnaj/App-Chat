import { createContext, ReactNode, useContext, useState } from "react";
import { ChatsType } from "./type";
import * as ChatsService from "../../services/chats/index";
import { MessageProvider } from "../messages";
import { FriendsProvider } from "../friends";

export type ChatsPropsType = {
  children: ReactNode;
};
export const ChatsContext = createContext({});
export const ChatsProvider = ({ children }: ChatsPropsType) => {
  const [loading, SetLoading] = useState<boolean>(false);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrent] = useState<any>(null);

  const setCurrentChat = (item: any) => {
    if (!item) return setCurrent(null);
    let chat: any = {
      isFoundChat: null,
    };
    chat = chats.find((i: any) => i.friendId._id == item.friendId._id);
    if (chat) {
      chat.isFoundChat = true;
      setCurrent(chat);
    } else {
      setCurrent(item);
    }
  };
  const getChats = async () => {
    SetLoading(true);
    try {
      const chats = await ChatsService.getChats();
      setChats(chats);
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };
  const addChat = async () => {
    SetLoading(true);
    try {
      const { chat } = await ChatsService.addChat(currentChat.friendId._id);
      setCurrent(chat);
      return chat;
    } catch (error) {
      console.log(error);
    } finally {
      SetLoading(false);
    }
  };
  const deleteChat = async (id: string) => {
    await ChatsService.deleteChat(id).then((_) => {
      if (id == currentChat._id) {
        setCurrent(null);
      }
      setChats((pre) => pre.filter((item: any) => item._id != id));
    });
  };

  const value: ChatsType = {
    loading,
    getChats,
    chats,
    setCurrentChat,
    currentChat,
    addChat,
    deleteChat,
  };
  return (
    <ChatsContext.Provider value={value}>
      <MessageProvider>
        <FriendsProvider>{children}</FriendsProvider>
      </MessageProvider>
    </ChatsContext.Provider>
  );
};
export const useChats = () => useContext(ChatsContext) as ChatsType;
