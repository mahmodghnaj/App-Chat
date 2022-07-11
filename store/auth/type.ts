export type AuthType = {
  loading: boolean;
  login: (Payload: PayloadLogin) => Promise<any>;
  register: (Payload: PayloadRegister) => Promise<any>;
  logout: () => Promise<any>;
  me: () => Promise<any>;
  user: any;
  requestSend: object[];
  setRequestSend: (user: any) => void;
  requestsFriends: object[];
  setRequestsFriends: (user: any) => void;
};
export type PayloadLogin = {
  email: string;
  password: string;
};
export type PayloadRegister = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
