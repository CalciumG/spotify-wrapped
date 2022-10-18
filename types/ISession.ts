import { Session } from "next-auth";

// export interface ISession extends Session {
//   data: {
//     accessToken: string;
//     expires: string;
//     id: string;
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   };
//   status: string;
// }

export interface ISession {
  data: {
    user: User;
    expires: string;
    id: string;
    accessToken: string;
  };
  status: string;
}

export interface User {
  name: string;
  email: string;
  picture: string;
  sub: string;
  expiresAt: number;
  accessToken: string;
  refreshToken: string;
  iat: number;
  exp: number;
  jti: string;
}
