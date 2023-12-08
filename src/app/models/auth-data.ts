export interface AuthData {
  accessToken: string;
  user: {
    name: string;
    email: string;
    cognome: string;
    id: number;
  };
}
