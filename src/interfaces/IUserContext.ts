export default interface IUserContext {
  loggedInUser: string | null;
  setLoggedInUser: (userId: string | null) => void;
  userDetails: any;
}
