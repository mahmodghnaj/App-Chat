import { createContext, useContext, useState } from "react";
import * as friendsService from "../../services/friends/index";
import { useAuth } from "../auth";
import { FriendsType } from "./type";
export type PrpopsProvider = {
  children: React.ReactNode;
};
export const FriendsContext = createContext({});
export const FriendsProvider = ({ children }: PrpopsProvider) => {
  const [loading, setLoading] = useState(false);
  const [loadingAddFriend, setLoadingFriend] = useState(false);
  const [friends, setFriends] = useState<any | any[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchFriends, setSearchFriends] = useState([]);
  const { setRequestSend, setRequestsFriends, user } = useAuth();
  const getFriends = async () => {
    setLoading(true);
    try {
      const res = await friendsService.getFriends();
      setFriends(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const deleteFriend = async (id: string) => {
    setLoading(true);
    try {
      const res = await friendsService.deleteFriend(id);
      setFriends((pre: any) => pre.filter((i: any) => i._id != id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const search = async (name: string | undefined) => {
    setLoadingSearch(true);
    try {
      if (!name) {
        setSearchFriends([]);
      } else {
        let res = await friendsService.serchFriends({ name: name });
        res = res.filter((item: any) => item._id != user._id);
        setSearchFriends(res);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSearch(false);
    }
  };
  const addFriend = async (id: string) => {
    setLoadingFriend(true);
    try {
      friendsService.addFriend(id).then((re) => {
        setRequestSend((pre: any) => [{ _id: id }, ...pre]);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFriend(false);
    }
  };
  const acceptFriend = async (friend: any) => {
    setLoadingFriend(true);
    try {
      friendsService.acceptFriend(friend._id).then((re) => {
        setFriends((pre: any) => [{ friendId: friend }, ...pre]);
        setRequestsFriends((pre: any) =>
          pre.filter((i: any) => i._id != friend._id)
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFriend(false);
    }
  };
  const refusalFriend = async (friend: any) => {
    setLoadingFriend(true);
    try {
      friendsService.refusalFriend(friend._id).then((re) => {
        setRequestsFriends((pre: any) =>
          pre.filter((i: any) => i._id != friend._id)
        );
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingFriend(false);
    }
  };

  const value: FriendsType = {
    loading,
    friends,
    getFriends,
    deleteFriend,
    search,
    searchFriends,
    loadingSearch,
    setSearchFriends,
    addFriend,
    loadingAddFriend,
    acceptFriend,
    refusalFriend,
  };
  return (
    <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>
  );
};
export const useFriends = () => useContext(FriendsContext) as FriendsType;
