import { Session } from "next-auth";

export interface ISession extends Session {
  data: {
    accessToken: string;
    expires: string;
    id: string;
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  };
  status: string;
}
