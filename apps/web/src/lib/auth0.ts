import { addUser } from "@/db/users";
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
      scope: "openid email profile",
      ...(ENV.AUTH0_AUDIENCE ? { audience: ENV.AUTH0_AUDIENCE } : {}),
    },
    // Before saving the session, decode the access token to get the permissions
    // and add them to the session object. Also save the user to the database.
    async beforeSessionSaved(session, idToken) {
      try {
        await addUser({
          id: session.user.sub,
          name: session.user.nickname ?? "Unnamed",
        });
      } catch (error) {
        console.error("Failed to save user to database:", error);
        // Swallow the error so authentication still succeeds
      }

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
