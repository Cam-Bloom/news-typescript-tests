import { createContext, useEffect, useState } from "react";
import { fetchUserByUserId } from "../utils/utils";
import IUserContext from "../interfaces/IUserContext";
import IUserDetails from "../interfaces/IUserDetails";
interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserProvider = (props: UserProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);

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
