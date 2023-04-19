import { createContext, useEffect, useState } from "react";
import { fetchUserByUserId } from "../utils/utils";
import IUserContext from "../interfaces/IUserContext";

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = (props: any) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>({});

  useEffect(() => {
    if (loggedInUser) {
      fetchUserByUserId(loggedInUser).then((res) => {
        setUserDetails(res.data.user);
      });
    }
  }, [loggedInUser]);

  return (
    <UserContext.Provider
      value={{ loggedInUser, setLoggedInUser, userDetails }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
