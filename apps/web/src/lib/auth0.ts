import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { jwtDecode } from "jwt-decode";
import { ENV } from "./environment";

let auth0Client: Auth0Client | undefined;

interface DecodedAccessToken {
  permissions?: string[];
}

export const getAuth0Client = () => {
  auth0Client ??= new Auth0Client({
    authorizationParameters: {
      scope: "openid",
      audience: ENV.AUTH0_AUDIENCE,
    },
    // Before saving the session, decode the access token to get the permissions
    // and add them to the session object.
    // eslint-disable-next-line @typescript-eslint/require-await
    async beforeSessionSaved(session, idToken) {
      if (!idToken || !session.tokenSet.accessToken) {
        return session;
      }

      // The permissions are automatically added to the accessToken by auth0.
      const decodedToken = jwtDecode<DecodedAccessToken>(
        session.tokenSet.accessToken,
      );

      return {
        ...session,
        user: {
          ...session.user,
          permissions: decodedToken.permissions ?? [],
        },
      };
    },
  });

  return auth0Client;
};
