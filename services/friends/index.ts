import api from "../../helpers/axios";

export const getFriends = async () => {
  return api.get("friends").then((re) => re.data);
};
export const addFriend = async (id: string) => {
  return api.post("friends", { friendId: id });
};
export const deleteFriend = async (id: string) => {
  return api.delete(`friends/${id}`).then((re) => re.data);
};
export const serchFriends = async (qp: object) => {
  return api.get("users", { params: qp }).then((re) => re.data);
};

export const acceptFriend = async (id: string) => {
  return api
    .post("friends/accept-friend", { friendId: id })
    .then((re) => re.data);
};
export const refusalFriend = async (id: string) => {
  return api
    .post("friends/refusal-friend", { friendId: id })
    .then((re) => re.data);
};
