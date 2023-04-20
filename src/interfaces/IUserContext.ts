import IUserDetails from "./IUserDetails";

export default interface IUserContext {
  loggedInUser: string | null;
  setLoggedInUser: (userId: string | null) => void;
  userDetails: IUserDetails | null;
}
