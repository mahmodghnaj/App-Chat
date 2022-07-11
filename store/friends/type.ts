export type FriendsType = {
  loading: boolean;
  getFriends: () => Promise<any>;
  deleteFriend: (id: string) => Promise<any>;
  friends: object[];
  search: (name: string | undefined) => Promise<any>;
  loadingSearch: boolean;
  searchFriends: any[];
  setSearchFriends: (friends: any) => void;
  addFriend: (id: string) => Promise<any>;
  acceptFriend: (item: object) => Promise<any>;
  refusalFriend: (item: object) => Promise<any>;
  loadingAddFriend: boolean;
};
