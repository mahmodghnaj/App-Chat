export type ChatsType = {
  loading: boolean;
  getChats: () => Promise<any>;
  chats: object[];
  setCurrentChat: (id: string) => void;
  currentChat: any;
  addChat: () => Promise<any>;
  deleteChat: (id: string) => Promise<any>;
};
