export interface AuthData {
  accessToken: string;
  user: {
    name: string;
    email: string;
    surname: string;
    id?: number;
  };
}
