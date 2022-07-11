import api from "../../helpers/axios";

export const getAll = (id: string) => {
  return api.get(`messages/${id}`).then((re) => re.data);
};
