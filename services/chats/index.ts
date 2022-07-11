import api from "../../helpers/axios";

export const getChats = async () => {
  return api.get("chats").then((re) => re.data);
};
export const addChat = async (id: string) => {
  return api.post("chats", { friendId: id }).then((re) => re.data);
};
export const deleteChat = async (id: string) => {
  return api.delete(`chats/${id}`).then((re) => re.data);
};
